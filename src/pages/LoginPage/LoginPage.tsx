import './style.scss';

export function LoginPage(){
    return <div className='loginpage'>
        <div className='loginpage-modal'>
            <form>
                <p>login</p>
                <input type="text" />
                <p>password</p>
                <input type="password" />
            </form>
        </div>
    </div>
}