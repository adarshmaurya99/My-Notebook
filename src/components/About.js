import React, {useContext, useEffect} from 'react'
import noteContext from '../context/notes/noteContext'

const About = () => {
//     const a = useContext(noteContext)
//     useEffect(()=> {
//         a.update()
// }, [])
  return (
    <div>
      About of the app
      {/* this is about {a.state.name} */}
    </div>
  )
}

export default About
