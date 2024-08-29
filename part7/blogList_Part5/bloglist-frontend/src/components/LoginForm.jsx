import Notification from './Notification'
const LoginForm = ({ notification, username, password, handleLogin, setUserName, setPassword }) => {
  return (
    <div>
      <h2>log in to application</h2>
      {notification && <Notification message={notification} />}
      <form onSubmit={handleLogin}>
        <div>
                    Username: <input type='text' id='username' data-testid="username" value={username} onChange={({ target }) => setUserName(target.value)} />
        </div>
        <div>
                    Password: <input type='password' id='password' data-testid="password"  value={password} onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}
export default LoginForm