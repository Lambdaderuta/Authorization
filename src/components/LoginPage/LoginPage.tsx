import React, { useState } from 'react';
import classnames from 'classnames';
import { RouteComponentProps } from 'react-router-dom';

import { userService } from 'services';

import './LoginPage.scss';


export function LoginPage(props: RouteComponentProps) {
    const { history, location: { state: from = { pathname: "/" } } } = props;

    const [authentication, setAuthentication] = useState({ username: '', password: '', submitted: false, error: '' })
    const [isLoading, setIsLoading] = useState(false);

    userService.logout();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuthentication({ ...authentication, [name]: value });
    }

    const handleSubmit = async (e:React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        setAuthentication({ ...authentication, submitted: true })

        if (!(authentication.username && authentication.password)) {
            return;
        }

        setIsLoading(true);
        try {
            await userService.login(authentication.username, authentication.password);
            history.push(from);
        } catch (error) {
            setIsLoading(false)
        }

    }
    return (
        <div className='login-page' >
            <div className='login-page__form'>
                <div className="alert alert-info">
                    <div className='login-page__headline'> Username: test</div>
                    <div className='login-page__headline'> Password: test</div>
                </div>
                <h2 className='login-page__headline'>Login</h2>
                <form name="form" onSubmit={handleSubmit}>
                    <div className={classnames('form-group', { ' has-error': (authentication.submitted && !authentication.username) })}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={authentication.username} onChange={handleChange} />
                        {authentication.submitted && !authentication.username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={classnames('form-group', { ' has-error': (authentication.submitted && !authentication.password) })}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className='form-control' name="password" value={authentication.password} onChange={handleChange} />
                        {authentication.submitted && !authentication.password &&
                            <div className='help-block'>Password is required</div>
                        }
                    </div>
                    <div className='form-group'>
                        <button className='btn btn-primary' disabled={isLoading}>Login</button>
                    </div>
                    {authentication.error &&
                        <div className={'alert alert-danger'}>{authentication.error}</div>
                    }
                </form>
            </div>
        </div>
    );
}

