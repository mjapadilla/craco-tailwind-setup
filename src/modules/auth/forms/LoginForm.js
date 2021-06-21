import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useHistory } from 'react-router-dom';
import { FormInput, FormInputMask } from 'modules/common/input';
import Button from 'modules/common/input/Button';
import { replaceAllString } from 'modules/common/helper';
import { schema } from '../constants';
import { useLogin } from '../hooks';

const INIT_FORM = {
  mobile_number: '',
  password: '',
};

function LoginForm() {
  const [isLoginApiLoading, login] = useLogin();
  const history = useHistory();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: INIT_FORM,
    resolver: yupResolver(schema),
    reValidateMode: 'onSubmit',
  });

  const handleOnSubmit = (form) => {
    const args = {
      ...form,
      mobile_number: replaceAllString(form?.mobile_number, '-'),
    };
    login(args, ({ is_first_login }) => {
      if (is_first_login) {
        history.push('/loading');
        return;
      }
      history.push('/');
    });
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <div className="space-y-5">
        <div>
          <p className="text-right mb-1 text-xs  font-medium text-primary-500">
            User Mobile No.
          </p>
          <div className="border border-gray-200 rounded p-3 pb-1">
            <Controller
              control={control}
              name="mobile_number"
              render={(e) => (
                <FormInputMask
                  label="User ID"
                  id="mobile_number"
                  placeholder="+639-XXXX-XXXXX"
                  mask="+63\9-9999-99999"
                  autoFocus
                  className="border-0 pr-12 pt-2 mt-1 ring-0 w-full outline-none text-gray-600"
                  error={errors?.mobile_number}
                  required
                  {...e.field}
                />
              )}
            />
          </div>
        </div>
        <div>
          <div className="border border-gray-200 rounded p-3 pb-1">
            <Controller
              control={control}
              name="password"
              render={(e) => (
                <FormInput
                  label="Password"
                  id="password"
                  placeholder="Enter your password"
                  className="border-0 pr-12 pt-2 mt-1 ring-0 w-full outline-none text-gray-600"
                  error={errors?.password}
                  type="password"
                  withShowPassword
                  required
                  {...e.field}
                />
              )}
            />
          </div>
          <div className="mt-2 flex">
            <button
              type="button"
              className="font-medium text-primary-500 text-sm ml-auto hover:text-primary-500"
            >
              Forgot Password
            </button>
          </div>
        </div>
        <div className="space-y-3">
          <Button
            type="submit"
            isLoading={isLoginApiLoading}
            className="btn primary md font-base text-sm"
            label="Login"
          />
          <p className="font-light text-sm text-primary-500">
            Don’t have account yet?{' '}
            <Link
              to="/register"
              className="font-semibold text-sm ml-auto hover:underline"
            >
              Register now.
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}
LoginForm.defaultProps = {};

LoginForm.propTypes = {};

export default LoginForm;
