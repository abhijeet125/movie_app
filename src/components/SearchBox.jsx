const SearchBox = (props) => {
return (

    <div className="col">
        <input 
        className="form-control"
        placeholder="search movie" 
        value={props.searchValue} 
        onChange={(e) => props.setSearchValue(e.target.value.trim())}
        />
    </div>
)
}
export default SearchBox;