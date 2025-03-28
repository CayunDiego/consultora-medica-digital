'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import './ContactForm.scss';

const ContactForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    googleSheet(data)
    sendWA(data)
  };

  const googleSheet = async (data) => {
    await fetch('/api/contact-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  const sendWA = (data) => {
    const message = `Nuevo mensaje de ${data.name} ${data.lastName} (${data.email}, ${data.whatsapp}): ${data.message}`;
    const whatsappLink = `https://wa.me/5492974140952?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
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
          <label htmlFor="whatsapp">Número de WhatsApp</label>
          <input id="whatsapp" {...register('whatsapp', { required: 'Número de WhatsApp es requerido' })} />
          {errors.whatsapp && <p className="error-message">{errors.whatsapp.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="message">Mensaje</label>
          <textarea id="message" {...register('message', { required: 'Mensaje es requerido' })}></textarea>
          {errors.message && <p className="error-message">{errors.message.message}</p>}
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default ContactForm;