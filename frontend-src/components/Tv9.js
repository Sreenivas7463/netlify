import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import Axios from "axios"

function Tv9(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [animal, setAnimal] = useState({ title: "", desc: "" })
    const { name } = useParams()
  
    useEffect(() => {
      const ourRequest = Axios.CancelToken.source()
  
      async function sendRequest() {
        setIsLoading(true)
        const response = await Axios.get(`https://tv9telugu.com/wp-json/wp/v2/posts/${name}`, { cancelToken: ourRequest.token })
        setAnimal(response.data)
        setIsLoading(false)
        document.title = `${response.data[0].title['rendered']} | Our Amazing App`
      }
      sendRequest()
      return () => {
        ourRequest.cancel()
      }
    }, [name])
  
    if (isLoading) {
      return (
        <div className="row">
          <p class="text-center py-5">...</p>
        </div>
      )
    }
  
    return (
      <div className="row">
        <div className="col-md-8 mb-4 mb-md-0">
          <h2 className="display-4">
            {animal[0].title['rendered']} <small className="text-muted text-tiny">({animal[0].modified})</small>
          </h2>
          <p className="lead">{animal[0].content['rendered']}</p>
          <Link className="btn btn-primary" to="/">
            Back home
          </Link>
        </div>
        
      </div>
    )
  }
  
  export default Tv9
  