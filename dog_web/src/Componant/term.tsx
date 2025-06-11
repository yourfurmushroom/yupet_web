import Button from "./Button";
import { motion } from "framer-motion";

export default function ShowTermDetail({ setTerm }: { setTerm: React.Dispatch<React.SetStateAction<boolean>> }) {
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
                        actionFunction={setTerm}
                        className="absolute font-bold text-3xl"
                    />
                </div>
                <div className="overflow-y-scroll overflow-x-auto p-5 w-[90%] h-[90%] m-auto scrollbar">
                    <span className="text-blue-400 inline-block w-[100%] text-center mb-3 font-bold text-[30px]">
                        Terms of Service
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
                    <p className="text-[20px] text-blue-400">1. Scope of Use</p>
                    <p>1.1 The Platform is a service designed for pet owners to provide arrhythmia analysis, aimed at helping
                        users monitor and analyze their pets' heart health.</p>
                    <p>1.2 You must be at least 18 years old or have full legal capacity in your jurisdiction to use the
                        Platform.</p>
                    <p>1.3 You must register an account and provide accurate, complete, and up-to-date personal information,
                        and promptly update it if there are any changes.</p>
                    <p>1.4 You are responsible for safeguarding your account and password and are fully liable for all
                        activities conducted using your account.</p>
                    <p className="text-[20px] text-blue-400">2. Service Content</p>
                    <p>2.1 The services provided by the Platform include, but are not limited to, pet electrocardiogram data
                        upload, AI analysis, and health report generation.</p>
                    <p>2.2 We reserve the right to modify, suspend, or terminate part or all of the services at any time
                        without prior notice.</p>
                    <p>2.3 The analysis results provided by the Platform are for reference only and cannot replace
                        professional veterinary diagnosis or advice. If your pet has health issues, please seek veterinary
                        care immediately.</p>
                    <p className="text-[20px] text-blue-400">3. User Conduct</p>
                    <p>3.1 You agree not to engage in the following activities on the Platform:</p>
                    <ul className="list-disc ml-6">
                        <li>Actions that violate the laws of the Republic of China or infringe upon the rights of third
                            parties;</li>
                        <li>Uploading or publishing false or misleading information;</li>
                        <li>Interfering with or disrupting the normal operation of the Platform;</li>
                        <li>Unauthorized access to the Platform’s systems or networks;</li>
                        <li>Using automated programs or software to collect information from the Platform;</li>
                        <li>Other behaviors we deem inappropriate.</li>
                    </ul>
                    <p>3.2 If you violate the above rules, we reserve the right to issue warnings, restrict or prohibit the
                        use of some or all functions, or terminate services, depending on the circumstances.</p>
                    <p className="text-[20px] text-blue-400">4. Disclaimer</p>
                    <p>4.1 The services provided by the Platform are offered on an "as is" and "as available" basis. We make
                        no express or implied warranties regarding the suitability, reliability, accuracy, or completeness
                        of the services.</p>
                    <p>4.2 The analysis results provided by the Platform are for reference only and do not constitute medical
                        diagnosis or advice. We are not liable for any losses resulting from the use or reliance on
                        information provided by the Platform.</p>
                    <p>4.3 We are not responsible for service interruptions or data loss caused by network failures, system
                        malfunctions, natural disasters, or other force majeure events.</p>
                    <p className="text-[20px] text-blue-400">5. Intellectual Property</p>
                    <p>5.1 All content on the Platform, including but not limited to text, images, logos, designs, and
                        software, is protected by the Republic of China's Copyright Law and international copyright
                        treaties.</p>
                    <p>5.2 Without our explicit written permission, you may not use, reproduce, modify, or distribute the
                        Platform’s content in any way.</p>
                    <p>5.3 For content you upload to the Platform, you retain intellectual property rights but grant us a
                        worldwide, royalty-free, non-exclusive, sublicensable license to use, reproduce, modify, and publish
                        such content to provide and improve our services.</p>
                    <p className="text-[20px] text-blue-400">6. Privacy Protection</p>
                    <p>6.1 We value your privacy and will collect and use your personal information in accordance with our
                        Privacy Policy.</p>
                    <p>6.2 You agree that we may collect, use, store, and share your personal information as outlined in the
                        Privacy Policy.</p>
                    <p className="text-[20px] text-blue-400">7. Termination</p>
                    <p>7.1 You may stop using the Platform at any time or deactivate your account as provided by the
                        Platform.</p>
                    <p>7.2 If you violate these Terms, we reserve the right to suspend or terminate your access to the
                        services and pursue legal action if necessary.</p>
                    <p>7.3 Upon termination of services, we may retain your relevant information as required by applicable
                        laws and regulations.</p>
                    <p className="text-[20px] text-blue-400">8. Amendments to Terms</p>
                    <p>8.1 We reserve the right to amend these Terms at any time. The amended Terms will be published on the
                        Platform.</p>
                    <p>8.2 The amended Terms take effect upon publication. Your continued use of the Platform indicates your
                        acceptance of the amended Terms.</p>
                    <p className="text-[20px] text-blue-400">9. Dispute Resolution</p>
                    <p>9.1 The interpretation, validity, and performance of these Terms are governed by the laws of the
                        Republic of China.</p>
                    <p>9.2 Any disputes arising from or related to these Terms shall be resolved through friendly
                        negotiation. If negotiation fails, the dispute shall be submitted to the Tainan District Court for
                        jurisdiction.</p>
                    <p className="text-[20px] text-blue-400">10. Miscellaneous</p>
                    <p>10.1 The headings in these Terms are for convenience only and do not affect their interpretation.</p>
                    <p>10.2 If any provision of these Terms is deemed invalid or unenforceable, the remaining provisions
                        remain in full force and effect.</p>
                    <p>10.3 Our failure to exercise or enforce any right or provision of these Terms does not constitute a
                        waiver of such right or provision.</p>
                    <hr className="mb-10 mt-10 border-gray-600"></hr>
                    <p className="text-center">
                        If you have any questions about these Terms, please contact us at:{' '}
                        <a href="mailto:m16131072@gs.ncku.edu.com" className="text-blue-400 hover:underline">
                            m16131072@gs.ncku.edu.com
                        </a>
                    </p>
                </div>
            </div>
        </motion.div>
    );
}