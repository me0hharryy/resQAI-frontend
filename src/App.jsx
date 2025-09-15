import { useState } from 'react'
import './App.css'
import {
    AlertFeed,
    DashboardMap,
    DashboardPage,
    Header,
    MetricsDisplay,
    ResourceManager,
    Sidebar
} from './components'
function App() {
  

  return (
    <>
      HHARRYY @ work
      <AlertFeed></AlertFeed>
      <DashboardMap></DashboardMap>
      <DashboardPage></DashboardPage>
      <Header></Header>
      <MetricsDisplay></MetricsDisplay>
      <ResourceManager></ResourceManager>
      <Sidebar></Sidebar>
    </>
  )
}

export default App
