"use client";

import { useState } from "react";
import { AuthForm } from "./AuthForm";
import { ImCross } from "react-icons/im";

function LoginModal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
                I am recruiting
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="relative w-3/4 lg:w-2/3">
                        <ImCross
                            onClick={() => setIsOpen(false)}
                            className="absolute top-2 right-2 text-black opacity-50 text-lg cursor-pointer hover:opacity-100 transition duration-300" />
                        <AuthForm />
                    </div>
                </div>
            )}
        </>
    );
}

export default LoginModal;