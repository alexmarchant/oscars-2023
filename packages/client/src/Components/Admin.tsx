import React from 'react'
import { useAuthStore } from '../stores/auth'
import { useWinnersStore } from '../stores/winners'
import { useLoaderData, redirect } from 'react-router-dom'
import { OscarData } from '../data/oscars'

export async function adminLoader() {
  // Make sure they are logged in, or else redirect
  let session = useAuthStore.getState().session 
  if (!session) {
    session = await useAuthStore.getState().getSession() 
    if (!session){
      return redirect('/signup')
    }
    if (!session.admin) {
      return redirect('/')
    }
  }
  await useWinnersStore.getState().getWinners()
  return null
}

export default function Admin() {
  useLoaderData()
  const winners = useWinnersStore(state => state.winners)
  const setWinner = useWinnersStore(state => state.setWinner)
  const deleteWinner = useWinnersStore(state => state.deleteWinner)

  async function handleSelectNominee(category: string, nominee: string) {
    await setWinner(category, nominee)
  }

  async function handleClearCategory(category: string) {
    await deleteWinner(category)
  }

  const Winners = OscarData.categories.map(category => {
    const categoryWinner = winners[category.name]

    const Nominees = category.nominees.map(nominee => (
      <div key={nominee.name}>
        <label>
        <input
          type="checkbox"
          checked={categoryWinner === nominee.name }
          onChange={() => handleSelectNominee(category.name, nominee.name)}
        />
        {nominee.name}
        {nominee.movie && ` [${nominee.movie}]`}
        </label>
      </div>
    ))

    return (
      <div key={category.name} style={{ marginBottom: '2em' }}>
        <h3 style={{ margin: '0 0 .3em 0' }}>
          {category.name}
        </h3>
        {Nominees}
        <button onClick={() => handleClearCategory(category.name)}>Clear</button>
      </div>
    )
  })

  return (
    <div>
      <h1>Admin</h1>
      {Winners}
    </div>
  )
}