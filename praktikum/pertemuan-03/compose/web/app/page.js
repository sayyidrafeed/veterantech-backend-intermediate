"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [formError, setFormError] = useState("");
  const [message, setMessage] = useState("");

  async function loadNotes() {
    setLoading(true);
    setLoadError("");
    try {
      const response = await fetch("/api/notes", { cache: "no-store" });
      if (!response.ok) throw new Error();
      const data = await response.json();
      setNotes(data);
    } catch {
      setLoadError("Catatan belum bisa dimuat. Periksa layanan, lalu tekan Muat ulang.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadNotes(); }, []);

  async function saveNote(event) {
    event.preventDefault();
    setFormError("");
    setMessage("");
    const value = text.trim();
    if (!value || value.length > 1000) {
      setFormError("Isi catatan harus 1–1.000 karakter, bukan hanya spasi.");
      return;
    }
    setSaving(true);
    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: value }),
      });
      if (!response.ok) throw new Error();
      setText("");
      setMessage("Catatan tersimpan.");
      await loadNotes();
    } catch {
      setFormError("Catatan belum tersimpan. Periksa layanan, lalu coba lagi.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main>
      <header>
        <p className="course">Backend Intermediate · Pertemuan 3</p>
        <h1>Catatan Kelas</h1>
        <p>Simpan satu hal yang kamu pelajari hari ini.</p>
      </header>

      <form onSubmit={saveNote}>
        <label htmlFor="note">Catatan baru</label>
        <textarea id="note" value={text} maxLength={1000} rows={4}
          disabled={saving} aria-invalid={Boolean(formError)}
          aria-describedby={formError ? "note-help form-error" : "note-help"}
          onChange={event => { setText(event.target.value); setFormError(""); setMessage(""); }} />
        <p id="note-help" className="hint">Maksimal 1.000 karakter · {text.length}/1.000</p>
        {formError && <p id="form-error" role="alert" className="error">{formError}</p>}
        <div className="submit-row">
          <button type="submit" disabled={saving || loading}>{saving ? "Menyimpan…" : "Simpan catatan"}</button>
          <p role="status">{message}</p>
        </div>
      </form>

      <section aria-labelledby="notes-title" aria-busy={loading}>
        <div className="section-heading">
          <h2 id="notes-title">Catatan tersimpan</h2>
          <button className="secondary" type="button" disabled={loading || saving}
            onClick={loadNotes}>Muat ulang</button>
        </div>
        {loading && <p role="status">Memuat catatan…</p>}
        {loadError && <p role="alert" className="error">{loadError}</p>}
        {!loading && !loadError && notes.length === 0 &&
          <p>Belum ada catatan. Tulis catatan pertama lewat form di atas.</p>}
        {loadError && notes.length > 0 && <p className="hint">Daftar berikut adalah hasil pemuatan sebelumnya.</p>}
        <ol>
          {notes.map(note => <li key={note.id}>
            <span className="note-id">#{note.id}</span>
            <p className="note-text">{note.text}</p>
            <time dateTime={note.created_at}>{new Date(note.created_at).toLocaleString("id-ID")}</time>
          </li>)}
        </ol>
      </section>
    </main>
  );
}
