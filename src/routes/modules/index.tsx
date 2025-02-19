import React, { useState, useEffect } from 'react'
import { ModulesResponse, Module } from '../../Modules/types'
import { createFileRoute } from '@tanstack/react-router'

const ModulesList: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/v1/modules?limit=15', {
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (!response.ok) {
          throw new Error('Failed to fetch')
        }
        const data: ModulesResponse = await response.json()
        setModules(data.modules)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      {modules.map((module) => (
        <div key={module.id}>
          <h2>{module.name}</h2>
          <p>{module.description}</p>
        </div>
      ))}
    </div>
  )
}

export const Route = createFileRoute('/modules/')({
  component: ModulesList,
})
