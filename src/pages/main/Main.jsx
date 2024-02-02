import styles from "./styles.module.css"
import NewsBanner from "../../assets/components/NewsBanner/NewsBanner"
import { useEffect, useState } from "react"
import { getNews } from "../../api/apiNews"
import NewsList from "../../assets/components/NewsList/NewsList"
import Skeleton from "../../assets/components/Skeleton/Skeleton"

const Main = () =>{
    const [news, setNews] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect (()=>{
        const fetchNews = async() =>{
            try {
                setIsLoading(true)
                const response = await getNews()
                setNews(response.news)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        
        fetchNews()
    },[])

    return (
        <main className={styles.main}>
            {news.length > 0 && !isLoading ? <NewsBanner item = {news[0]} /> : <Skeleton type={"banner"} count={1} />}

            {!isLoading ? <NewsList news ={news}/> : <Skeleton type={"item"} count={10} />}
        </main>
    )
}

export default Main