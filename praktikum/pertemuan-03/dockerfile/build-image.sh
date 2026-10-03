#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -ne 2 ]; then
  echo 'Usage: bash build-image.sh IMAGE_TAG BUILD_CONTEXT' >&2
  exit 2
fi

image_tag="$1"
build_context="$(cd "$2" && pwd)"
free_kib="$(df -Pk "$build_context" | awk 'NR == 2 {print $4}')"
if [ "$free_kib" -lt 20971520 ]; then
  echo 'Build dihentikan: demo Docker perlu minimal 20 GiB disk kosong.' >&2
  exit 1
fi

active_builds="$(ps -axo pid,command | awk '/[d]ocker build|[d]ocker buildx build|[n]ext build|[v]ite build/ && !/awk/ {print}')"
if [ -n "$active_builds" ]; then
  echo 'Build dihentikan: ada build aktif; tunggu pemiliknya selesai.' >&2
  printf '%s\n' "$active_builds" >&2
  exit 1
fi

lock_dir="$HOME/.cache/codex-heavy-build.lock"
mkdir -p "$HOME/.cache"
if ! mkdir "$lock_dir" 2>/dev/null; then
  echo 'Build dihentikan: heavy-build lock sudah ada. Periksa pemiliknya; jangan hapus lock aktif.' >&2
  exit 1
fi

release_lock() {
  if [ -f "$lock_dir/pid" ] && [ "$(cat "$lock_dir/pid")" = "$$" ]; then
    rm -- "$lock_dir/pid" "$lock_dir/project" "$lock_dir/command"
    rmdir -- "$lock_dir"
  fi
}
trap release_lock EXIT
trap 'exit 130' INT
trap 'exit 143' TERM
printf '%s\n' "$$" > "$lock_dir/pid"
printf '%s\n' "$build_context" > "$lock_dir/project"
printf 'docker build -t %q %q\n' "$image_tag" "$build_context" > "$lock_dir/command"

docker build -t "$image_tag" "$build_context"
