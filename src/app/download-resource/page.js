'use client';
import React from 'react'
import { useForm } from 'react-hook-form'
import './DownloadResource.scss'

const DownloadResource = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    console.log(data)
    // Aquí puedes agregar la lógica para descargar el PDF
    downloadPDF()
    googleSheet(data)
  }

  const googleSheet = async (data) => {
    await fetch('/api/download-resource', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  const downloadPDF = async () => {
    try {
      const pdfUrl = 'https://framerusercontent.com/assets/mpO0gLCYhtmp1nOoshVq3hr3lzc.pdf';
      const response = await fetch(pdfUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = '3 Errores Legales que Todo Cirujano Plástico debe Evitar en su Web - Ebook.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Failed to fetch PDF:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="download-form">
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input id="name" {...register('name', { required: 'Nombre es requerido' })} />
          {errors.name && <p className="error-message">{errors.name.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Apellido</label>
          <input id="lastName" {...register('lastName', { required: 'Apellido es requerido' })} />
          {errors.lastName && <p className="error-message">{errors.lastName.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email para contactarte</label>
          <input id="email" {...register('email', { required: 'Email es requerido', pattern: { value: /^\S+@\S+$/i, message: 'Email inválido' } })} />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="whatsapp">Número de WhatsApp (opcional)</label>
          <input id="whatsapp" {...register('whatsapp')} />
          {errors.whatsapp && <p className="error-message">{errors.whatsapp.message}</p>}
        </div>
        <button type="submit">Descargar PDF</button>
      </form>
    </div>
  )
}

export default DownloadResource
