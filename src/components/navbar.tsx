export default function NavBar() {
    return (
        <div className="navbar px-6 mx-6">
            <h2 className="navbar-heading py-5">Navbar</h2>
            <a href={"/notes"} className="navbar-item clickable w-100">Notes</a>
            <div className="spacer-y"></div>
            <a href={"/reminders"} className="navbar-item clickable w-100">Reminder</a>
            <div className="spacer-y"></div>
            <a href={"/trash"} className="navbar-item clickable w-100">Trash</a>
        </div>
    )
}