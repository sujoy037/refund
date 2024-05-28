import React,{useState} from 'react'
import Layout from '../core/Layout'
import { useNavigate } from 'react-router-dom';
import { authenticate, isAuthenticated, signin } from '../auth';
const Signin = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    userid: '',
    password: '',
    error: '',
    loading: false,
    redirectToReferrer: false
  });
  const { userid, password, loading, error,redirectToReferrer } = values;

  const { user } = isAuthenticated();

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ userid, password }).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        // On successful sign-in, authenticate user and set redirectToReferrer to true
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true
          });
        });
      }
    });
  };

   // Function to render error message if there is one
   const showError = () => (
    <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
      {error}
    </div>
  );

  // Function to render loading message
  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );

 
  // Function to redirect user to home page if authenticated
  const redirectUser = () => {
    console.log('User:', user); // Log the user object for debugging
  console.log('redirectToReferrer:', redirectToReferrer); 
    if (redirectToReferrer) {
      if (user && user.usertype === 'admin') {
        return navigate('/admin/dashboard');
      } else {
        return navigate('/user/dashboard');
      }
    } else if (isAuthenticated()) {
      // If authenticated but redirectToReferrer is false, navigate to '/'
      return navigate('/');
    }
  };
  return (
    <Layout title="Signin" description="Please Login Here" className="container col-md-8 offset-md-2">
    {showLoading()}
    {showError()}
      <form>
        <div className="form-group">
          <label className="text-muted">UserId</label>
          <input
            name='userid'
            type="text"
            className="form-control"
            value={userid}
            onChange={handleChange('userid')}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            name='password'
            type="password"
            className="form-control"
            value={password}
            onChange={handleChange('password')}
          />
        </div>
        <button className="btn btn-primary" onClick={clickSubmit}>
          Submit
        </button>
      </form>
      {redirectUser()}
    </Layout>
  )
}

export default Signin