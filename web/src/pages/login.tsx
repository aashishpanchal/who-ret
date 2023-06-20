import { Formik, Field } from "formik";
import { ASY_STATUS } from "@/constants";
import { TextField } from "formik-mui";
import Copyright from "@/components/copy-right";
import { Typography, Box } from "@mui/material";
import { loginUser } from "@/redux/features/authSlice";
import LoadingBtn from "@/components/buttons/loading-btn";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import PhoneInput from "@/components/form/text-input/phone-input";
import { loginSchema, initialValues } from "@/constants/schemas/login-schema";

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch(); // dispatch
  const { status, error } = useAppSelector((state) => state.auth);

  return (
    <Box
      component="section"
      className="flex h-screen w-screen items-center justify-center"
    >
      <Box className="flex flex-col items-center max-w-sm bg-white p-3 py-4 rounded-xl  space-y-5 shadow-md">
        <Box className="flex flex-col items-center justify-center">
          <img src="/who-ret-icon.png" className="w-[60%]" />
          <span className="text-3xl font-bold text-gray-900 font-Poppins">
            Admin Panel
          </span>
        </Box>
        <Box className="space-y-3 mx-5">
          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={async (values) => {
              await dispatch(loginUser(values));
            }}
          >
            {(formik) => (
              <>
                <Field
                  component={PhoneInput}
                  required
                  id="phone"
                  label="Phone +61 (469) 856 810 "
                  name="phone"
                  autoComplete="phone"
                  placeholder="+61 469 856 810"
                  variant="outlined"
                  fullWidth
                />
                <Field
                  component={TextField}
                  required
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                />
                <LoadingBtn
                  fullWidth
                  variant="contained"
                  type="submit"
                  isLoading={status === ASY_STATUS.LOADING}
                  onClick={formik.handleSubmit as any}
                >
                  Log in
                </LoadingBtn>
              </>
            )}
          </Formik>
          {error?.message && (
            <p className="text-center text-red-500 text-sm">
              ❗{error?.message}
            </p>
          )}
          <Typography className="font-medium text-center">
            Don't share your password with any one
          </Typography>
        </Box>
        <Copyright />
      </Box>
    </Box>
  );
};

export default LoginForm;
