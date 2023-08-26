import routes from "../routes/routes"
import { toTitleCase } from "../utils/utils"

export default function NavBar() {
    return (
        <div className="navbar flex-column px-6 mx-6">
            <h2 className="navbar-heading py-5">DuxNotes</h2>
            <div id="navbar-options py-5">
                {
                    Object.keys(routes).map((route: string) => {
                        return route.length > 1 ? (
                            <>
                                <div className="spacer-y"></div>
                                <a href={route} className="navbar-item clickable w-100">{toTitleCase(route.substring(1))}</a>
                            </>) : <></>
                    })
                }
            </div>
            <div id="footer" className="w-100 my-4 bottom-0 py-4 center text-white">
                Made by <a className="no-decoration" href="https://github.com/anuran-roy"><b>Anuran</b></a> with ❤
            </div>
        </div>
    )
}