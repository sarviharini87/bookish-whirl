import "./Navbar.css"
function Navbar(){
    return(
        <nav class="navbar">
            <div>
            <h3> Bookish Whirl </h3>
            </div>

            <ul className="tablinks">
                <li><a href="#">Home</a></li>
                <li><a href="#">Discover</a></li>
                <li><a href="#">My TBR</a></li>
            </ul>
        </nav>
    )
}
export default Navbar