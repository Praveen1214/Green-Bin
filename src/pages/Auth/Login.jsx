import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, ConfigProvider, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setIsAuthenticated }) => { // Receive setIsAuthenticated as a prop
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            setLoading(true);
            const user = { email, password };
            
            const response = await axios.post("http://localhost:5000/api/managers/login", user);
            setLoading(false);

            const userData = response.data;

            if (userData.status === "Suspended") {
                message.error("Your account has been suspended");
                navigate("/contactus");
                return;
            }

            // If login is successful
            localStorage.setItem("currentUser", JSON.stringify(userData));
            localStorage.setItem("scrollPosition", window.pageYOffset);
            setIsAuthenticated(true); // Set authentication state to true
            
            // Navigate based on the role
            switch (userData.role) {
                case "manager":
                case "admin":
                    navigate("/"); // Correct route, no extra spaces
                    break;
                default:
                    navigate("/"); // In case the role is not recognized
                    break;
            }
        } catch (error) {
            setLoading(false);
            message.error("Invalid email or password");
        }
    };

    return (
        <div className="max-w-md h-[430px] mx-auto mt-24 mb-24 p-5 border border-gray-300 rounded-md bg-white shadow-md">
            <ConfigProvider
                theme={{
                    components: {
                        Button: {
                            colorPrimary: "#99707E",
                        },
                    },
                }}
            >
                <h4 className="text-xl font-bold mt-4">Hi, Welcome back!</h4>
                <p className="text-gray-600">Enter your credentials to continue</p>
                <Form
                    className="mt-4 w-full"
                    name="normal_login"
                    initialValues={{ remember: true }}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            { required: true, message: "Please input your Username!" }
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className="text-gray-400" />}
                            placeholder="Email"
                            className="rounded-md"
                            size="large"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: "Please input your Password!" }
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="text-gray-400" />}
                            placeholder="Password"
                            className="rounded-md"
                            size="large"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item className="flex justify-between items-center">
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <a className="text-blue-500 hover:text-blue-700" href="/ForgetPassword">
                            Forgot password
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full bg-[#99707E] hover:bg-[#fef6ff] active:bg-[#eeeeee] focus:outline-none"
                            loading={loading}
                            size="large"
                            onClick={handleLogin}
                        >
                            Log in
                        </Button>
                        <div className="mt-3 text-center">
                            Don't have an Account?{" "}
                            <a className="text-blue-500 hover:text-blue-700" href="/signup">
                                Sign up!
                            </a>
                        </div>
                    </Form.Item>
                </Form>
            </ConfigProvider>
        </div>
    );
};

export default Login;
