import { NextResponse } from 'next/server';
import { appendSpreadsheet } from '../../../../lib/googleSheets';

export async function POST(request) {
  const { name, lastName, email, whatsapp } = await request.json();

  try {
    await appendSpreadsheet({ name, lastName, email, whatsapp }, 1);
    return NextResponse.json({ message: 'Datos agregados correctamente' });
  } catch (error) {
    console.error('Error al agregar datos a la hoja de cálculo:', error);
    return NextResponse.json({ error: 'Error al agregar datos a la hoja de cálculo' }, { status: 500 });
  }
}