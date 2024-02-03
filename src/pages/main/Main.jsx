import styles from "./styles.module.css"
import NewsBanner from "../../assets/components/NewsBanner/NewsBanner"
import { useEffect, useState } from "react"
import { getNews } from "../../api/apiNews"
import NewsList from "../../assets/components/NewsList/NewsList"
import Skeleton from "../../assets/components/Skeleton/Skeleton"
import Pagination from "../../assets/components/Pagination/Pagination"

const Main = () =>{
    const [news, setNews] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = 10
    const pageSize = 10

    const fetchNews = async(currentPage) =>{
        try {
            setIsLoading(true)
            const response = await getNews(currentPage, pageSize)
            setNews(response.news)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect (()=>{
        
        fetchNews(currentPage)
    },[currentPage])

    const handleNextPage = () => {
        if(currentPage < totalPages){
            setCurrentPage(currentPage + 1)
        }
    }

    const handlePreviousPage = () => {
        if(currentPage > 1){
            setCurrentPage(currentPage - 1)
        }
    }

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return (
        <main className={styles.main}>
            {news.length > 0 && !isLoading ? <NewsBanner item = {news[0]} /> : <Skeleton type={"banner"} count={1} />}

            <Pagination
             handlePageClick ={handlePageClick}
             handlePreviousPage = {handlePreviousPage}
             handleNextPage = {handleNextPage}
             currentPage ={currentPage}
             totalPages={totalPages} />

            {!isLoading ? <NewsList news ={news}/> : <Skeleton type={"item"} count={10} />}

            <Pagination
             handlePageClick ={handlePageClick}
             handlePreviousPage = {handlePreviousPage}
             handleNextPage = {handleNextPage}
             currentPage ={currentPage}
             totalPages={totalPages} />
        </main>
    )
}

export default Main