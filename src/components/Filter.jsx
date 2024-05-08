
const Filter = ({handleFilterChange}) => {
    return (
        <div>
            Filter Shown with: <input onChange={handleFilterChange}/>
        </div>
    )
}

export default Filter