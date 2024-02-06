import styles from "./styles.module.css"

const Search = ({keywords, setKeywords}) =>{
    return(
        <div className={styles.search}>
            <input
            type="text" 
            value={keywords} 
            onChange={(e) => setKeywords(e.target.value)} 
            placeholder="Search..." 
            className={styles.input} 
            />
        </div>
    )
}

export default Search