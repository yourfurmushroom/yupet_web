import Button from "./Button";
import { motion } from "framer-motion";

export function ShowPrivacyDetail({ setPrivacy }: { setPrivacy: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ scaleY: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "linear" }}
            className="absolute top-1/2 left-1/2 w-full h-full bg-white z-100 transform -translate-x-1/2 -translate-y-1/2 rounded-4xl shadow-2xs origin-top"
        >
            <div className="fixed inset-0 bg-gray-300 bg-opacity-50 z-50"></div>
            <div className="absolute top-1/2 left-1/2 w-full h-full bg-white z-100 transform -translate-x-1/2 -translate-y-1/2 rounded-4xl shadow-2xs">
                <div className="flex justify-end m-5">
                    <Button
                        disabled={false}
                        type="action"
                        name="x"
                        actionFunction={setPrivacy}
                        className="absolute font-bold text-3xl"
                    />
                </div>
                <div className="overflow-y-scroll overflow-x-auto p-5 w-[90%] h-[90%] m-auto scrollbar">
                    <span className="text-blue-400 inline-block w-[100%] text-center mb-3 font-bold text-[30px]">
                        Privacy Policy
                    </span>
                    <span className="text-gray-500 inline-block w-[100%] text-center mb-5 text-[15px]">
                        Last Updated: March 24, 2025
                    </span>
                    <hr className="mb-5 border-gray-600"></hr>
                    <span className="text-black inline-block w-[100%] text-left text-[15px] mb-3">
                        Yupet (hereinafter referred to as "we" or "us") highly values your privacy. This Privacy Policy
                        (hereinafter referred to as the "Policy") aims to explain how we collect, use, store, and protect
                        your personal information. Please carefully read and understand the full content of this Policy
                        before using the Yupet platform (hereinafter referred to as the "Platform").
                    </span>
                    <span className="text-black inline-block w-[100%] text-left text-[15px] mb-3">
                        By registering, accessing, or using the Platform, you indicate that you have read, understood, and
                        agreed to our processing of your personal information in accordance with this Policy. If you do not
                        agree with any part of this Policy, please do not use the Platform.
                    </span>
                    <p>
                        Yupet (hereinafter referred to as "we" or "us") highly values your privacy. This Privacy Policy
                        (hereinafter referred to as the "Policy") aims to explain how we collect, use, store, and protect
                        your personal information. Please carefully read and understand the full content of this Policy
                        before using the Yupet platform (hereinafter referred to as the "Platform").
                    </p>
                    <p>
                        By registering, accessing, or using the Platform, you indicate that you have read, understood, and
                        agreed to our processing of your personal information in accordance with this Policy. If you do not
                        agree with any part of this Policy, please do not use the Platform.
                    </p>
                    <p className="text-[20px] text-blue-400">1. Collection of Personal Information</p>
                    <p>1.1 The types of personal information we collect include:</p>
                    <ul className="list-disc ml-6">
                        <li className="mb-3">
                            <strong>Account Information</strong>: Username, email address, password, and other information
                            required for registration and login;
                        </li>
                        <li className="mb-3">
                            <strong>Personal Information</strong>: Real name, address, phone number, and other information
                            you voluntarily provide;
                        </li>
                        <li className="mb-3">
                            <strong>Pet Information</strong>: Pet name, breed, age, weight, and other pet-related information
                            you provide;
                        </li>
                        <li className="mb-3">
                            <strong>Health Information</strong>: Pet electrocardiogram data and related health records you
                            upload;
                        </li>
                        <li className="mb-3">
                            <strong>Usage Information</strong>: Information about how, when, and how often you use the
                            Platform;
                        </li>
                        <li className="mb-3">
                            <strong>Device Information</strong>: IP address, browser type, operating system, and other
                            technical information.
                        </li>
                    </ul>
                    <p>1.2 We collect your personal information through the following methods:</p>
                    <ul className="list-disc ml-6">
                        <li className="mb-3">Information you directly provide, such as during account registration, form
                            submission, or file uploads;</li>
                        <li className="mb-3">Information automatically generated when you use the Platform, such as logs and
                            Cookies;</li>
                        <li className="mb-3">Information obtained from third parties, such as when you log in using a
                            third-party account (e.g., Google).</li>
                    </ul>
                    <p className="text-[20px] text-blue-400">2. Use of Personal Information</p>
                    <p>2.1 The purposes for which we use your personal information include:</p>
                    <ul className="list-disc ml-6">
                        <li className="mb-3">Providing, maintaining, and improving the Platform's services;</li>
                        <li className="mb-3">Processing your pet's electrocardiogram data and providing analysis results;</li>
                        <li className="mb-3">Responding to your questions, requests, and feedback;</li>
                        <li className="mb-3">Sending you service notifications and updates;</li>
                        <li className="mb-3">Preventing, detecting, and investigating fraud, security vulnerabilities, and
                            other potentially prohibited or illegal activities;</li>
                        <li className="mb-3">Protecting our and our users' rights and property;</li>
                        <li className="mb-3">Complying with legal and regulatory requirements.</li>
                    </ul>
                    <p>2.2 We will not use your personal information for purposes unrelated to those listed above unless we
                        obtain your explicit consent or as otherwise required by law.</p>
                    <p className="text-[20px] text-blue-400">3. Storage of Personal Information</p>
                    <p>3.1 We will retain your personal information for the period reasonably necessary to achieve the
                        purposes outlined in this Policy, unless a longer retention period is required or permitted by
                        law.</p>
                    <p>3.2 We implement appropriate technical and organizational measures to protect your personal
                        information from unauthorized access, use, or disclosure.</p>
                    <p>3.3 While we take reasonable security measures, please note that internet transmission is not
                        completely secure, and we cannot guarantee the absolute security of your data during
                        transmission.</p>
                    <p className="text-[20px] text-blue-400">4. Sharing of Personal Information</p>
                    <p>4.1 We will not share your personal information with third parties without your consent, except in the
                        following cases:</p>
                    <ul className="list-disc ml-6">
                        <li className="mb-3">As required by laws or regulations or by legitimate requests from government
                            authorities;</li>
                        <li className="mb-3">To protect our or other users' rights, property, or safety;</li>
                        <li className="mb-3">With our affiliates, service providers, and business partners, who process your
                            personal information on our behalf and are bound by confidentiality obligations;</li>
                        <li className="mb-3">With your explicit consent.</li>
                    </ul>
                    <p>4.2 We will not sell, rent, or trade your personal information to any third party.</p>
                    <p className="text-[20px] text-blue-400">5. Use of Cookies</p>
                    <p>5.1 We use Cookies and similar technologies to enhance your user experience, including:</p>
                    <ul className="list-disc ml-6">
                        <li className="mb-3">Remembering your login status and preferences;</li>
                        <li className="mb-3">Analyzing how you use the Platform to improve our services;</li>
                        <li className="mb-3">Providing personalized content and recommendations.</li>
                    </ul>
                    <p>5.2 You can refuse or restrict Cookies through your browser settings, but this may affect certain
                        functionalities of the Platform.</p>
                    <p className="text-[20px] text-blue-400">6. Your Rights</p>
                    <p>6.1 Under the Republic of China's Personal Data Protection Law, you have the following rights
                        regarding your personal information:</p>
                    <ul className="list-disc ml-6">
                        <li className="mb-3">Request access to or review your personal information;</li>
                        <li className="mb-3">Request a copy of your personal information;</li>
                        <li className="mb-3">Request corrections or supplements to your personal information;</li>
                        <li className="mb-3">Request cessation of the collection, processing, or use of your personal
                            information;</li>
                        <li className="mb-3">Request deletion of your personal information.</li>
                    </ul>
                    <p>6.2 To exercise the above rights, please contact us using the contact information provided at the end
                        of this Policy. We will respond to your request within a reasonable timeframe.</p>
                    <p>6.3 Please note that in certain cases, we may not be able to fulfill your requests due to legal
                        requirements or other legitimate reasons.</p>
                    <p className="text-[20px] text-blue-400">7. Children's Privacy</p>
                    <p>7.1 The Platform is not intended for children under 14 years of age, and we do not knowingly collect
                        personal information from children under 14.</p>
                    <p>7.2 If you are under 14 years of age, please use the Platform under the guidance of a parent or
                        guardian.</p>
                    <p>7.3 If we discover that we have collected personal information from a child under 14, we will take
                        immediate steps to delete such information.</p>
                    <p className="text-[20px] text-blue-400">8. Policy Updates</p>
                    <p>8.1 We may update this Policy from time to time to reflect changes in our practices or legal
                        requirements.</p>
                    <p>8.2 The updated Policy will be published on the Platform with the last updated date indicated.</p>
                    <p>8.3 Significant changes will be communicated to you via email or notifications on the Platform.</p>
                    <p>8.4 Your continued use of the Platform indicates your agreement to be bound by the updated
                        Policy.</p>
                    <p className="text-[20px] text-blue-400">9. Contact Us</p>
                    <p>If you have any questions, comments, or requests regarding this Policy, please contact us via the
                        following methods:</p>
                    <ul className="list-disc ml-6">
                        <li className="mb-3">Email: m16131072@gs.ncku.edu.com</li>
                        <li className="mb-3">Phone: (06) 1234567</li>
                        <li className="mb-3">Address: No. 1, University Road, East District, Tainan City 701, Taiwan</li>
                    </ul>
                    <p>We will respond to your request within a reasonable timeframe.</p>
                </div>
            </div>
        </motion.div>
    );
}