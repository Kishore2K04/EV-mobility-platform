import { Link } from "react-router-dom";

function Home() {

    return (

        <div style={{ padding: "40px" }}>

            <h1>EVOLT Ride</h1>

            <h3>Choose Portal</h3>

            <br/>

            <Link to="/rider/register">
                Rider Registration
            </Link>

            <br/><br/>

            <Link to="/driver/register">
                Driver Registration
            </Link>

            <br/><br/>

            <Link to="/login">
                Rider Login
            </Link>

            <br/><br/>

            <Link to="/login">
                Driver Login
            </Link>

        </div>

    );

}

export default Home;