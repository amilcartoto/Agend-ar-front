import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import EventCalendar from '../components/calendar/EventCalendar.jsx'


const MOCK_EVENTS = [
  {
    fecha: '2025-01-15',
    title: 'Evento único',
    category: 'Música',
    location: 'Córdoba',
    time: '20:00',
  },
  {
    start: '2025-01-10',
    end: '2025-01-12',
    title: 'Evento rango',
    category: 'Teatro',
    location: 'Rosario',
    time: '18:00',
  },
]

describe('EventCalendar', () => {
  it('renderiza el mes y año actuales', () => {
    render(<EventCalendar eventos={[]} />)

    const now = new Date()
    const monthNames = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    const header = screen.getByText(new RegExp(`${monthNames[now.getMonth()]} ${now.getFullYear()}`))

    expect(header).toBeTruthy()
  })

  it('muestra los nombres de los días', () => {
    render(<EventCalendar eventos={[]} />)

    ;['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].forEach(dia => {
      expect(screen.getByText(dia)).toBeTruthy()
    })
  })

  it('abre el modal al hacer clic en un día con eventos', () => {
    // Forzamos la fecha actual al mismo mes/año de los eventos para que se vean
    const fixedDate = new Date(2025, 0, 1) // Enero 2025
    const RealDate = Date
    global.Date = class extends RealDate {
      constructor(...args) {
        if (args.length === 0) {
          return fixedDate
        }
        return new RealDate(...args)
      }
    }

    render(<EventCalendar eventos={MOCK_EVENTS} />)

    // Click en el día 15 (tiene "Evento único")
    fireEvent.click(screen.getByText('15'))

    expect(screen.getByText(/Eventos: 15 de Enero/i)).toBeTruthy()
    expect(screen.getByText('Evento único')).toBeTruthy()

    // Restaurar 
    global.Date = RealDate
  })
})
