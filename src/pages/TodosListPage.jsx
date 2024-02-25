import React from 'react'
import useToast from '../hooks/useToast'

export default function TodosListPage() {

  const { getQueue, setToast } = useToast();
  
  return (
    <div>Todos</div>
  )
}
