import Button from '@/Componant/Button';
import { LoginStatus } from '@/Componant/Interface';
import { motion, AnimatePresence } from 'framer-motion';

export default function Services({isUserLogin,setUserLogin,setLogin,setRegister,setShowWeb}:LoginStatus) {
    return (
        <motion.div key="Main" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="p-10">
            <div>
                <span className="text-blue-400 inline-block w-[100%] text-center my-10 font-bold text-[30px]">Our Services</span>
                <span className="text-gray-500 inline-block w-[100%] text-center mb-5 text-[15px]">Yupet offers comprehensive pet heart health monitoring services, allowing you to stay informed about your beloved pet’s health at any time.</span>
            </div>
            <YupetSensor ></YupetSensor>
            <AIMonitoring action={isUserLogin? ()=>setShowWeb("Dashboard"):setLogin}></AIMonitoring>
            <HealthReport action={isUserLogin? ()=>setShowWeb("Dashboard"):setLogin}></HealthReport>
            <FutureWork></FutureWork>
        </motion.div>
    )
}

function YupetSensor() {
    return (
        <div className='flex justify-center w-full mb-5'>
            <div id="analysis" className="w-[60%] service-card flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="md:w-1/2">
                    <img
                        src="./YuDisplay.png"
                        alt="Yupet 感測器"
                        className="w-full h-full object-contain"
                    />
                </div>
                <div className="p-6 md:w-1/2 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-4">Yupet ECG Sensor</h3>
                    <p className="text-gray-700 mb-4">
                        Yupet is a sensor capable of measuring electrocardiograms (ECG), providing accurate heart rhythm data to help pet owners monitor their pets’ health in real-time.
                    </p>
                    <ul className="space-y-2 mb-6">
                        <li><i className="fas fa-check-circle text-blue-500 mr-2"></i> High-precision electrocardiogram measurement</li>
                        <li><i className="fas fa-check-circle text-blue-500 mr-2"></i> Compact and portable design</li>
                        <li><i className="fas fa-check-circle text-blue-500 mr-2"></i> Simple and user-friendly interface</li>
                        <li><i className="fas fa-check-circle text-blue-500 mr-2"></i> Real-time data transmission</li>
                        <li><i className="fas fa-check-circle text-blue-500 mr-2"></i> Seamless integration with the Yupet platform</li>
                    </ul>
                    <Button disabled={false} name="Learn More" type="action" actionFunction={null} className="m-2 border-2 bg-blue-500 text-white font-bold group relative inline-block rounded-2xl h-12 w-30 hover:bg-blue-600 hover:scale-110 duration-300 ease-in-out"></Button>
                </div>
            </div>
        </div>
    );
}

function AIMonitoring({action}:{action:any}) {
    return (
        <div className='flex justify-center w-full mb-5'>
            <div id="monitoring" className="w-[60%] service-card flex flex-col md:flex-row-reverse bg-white rounded-2xl shadow-lg overflow-hidden">
                <div
                    className="md:w-1/2 bg-cover bg-center min-h-[250px]"
                    style={{ backgroundImage: "url('./dog_health_illustration.jpeg')" }}
                ></div>
                <div className="p-6 md:w-1/2 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-4">AI heart rhythm analysis</h3>
                    <p className="text-gray-700 mb-4">
                        Utilizing advanced artificial intelligence technology to precisely analyze pets' electrocardiogram data and quickly identify potential arrhythmia issues.
                    </p>
                    <ul className="space-y-2 mb-6">
                        <li><i className="fas fa-check-circle text-blue-500 mr-2"></i> Analysis accuracy of up to 98%</li>
                        <li><i className="fas fa-check-circle text-blue-500 mr-2"></i> Rapid processing of large volumes of data</li>
                        <li><i className="fas fa-check-circle text-blue-500 mr-2"></i> Automatic detection of abnormal heart rhythm patterns</li>
                        <li><i className="fas fa-check-circle text-blue-500 mr-2"></i> Continuous learning and algorithm optimization</li>
                        <li><i className="fas fa-check-circle text-blue-500 mr-2"></i> Developed under the supervision of a professional veterinary team</li>
                    </ul>
                    <Button disabled={false} name="Try It Now" type="action" actionFunction={action} className="m-2 border-2 bg-blue-500 text-white font-bold group relative inline-block rounded-2xl h-12 w-30 hover:bg-blue-600 hover:scale-110 duration-300 ease-in-out"></Button>
                </div>
            </div>
        </div>
    )
}

function HealthReport({action}:{action:any}) {
    return (
        <div className='flex justify-center w-full mb-5'>
            <div id="reports" className="w-[60%] service-card flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden">
                <div
                    className="md:w-1/2 bg-cover bg-center min-h-[250px]"
                    style={{ backgroundImage: "url('./vet_with_dog.jpeg')" }}
                ></div>
                <div className="p-6 md:w-1/2 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-4">Health reports and recommendations</h3>
                    <p className="text-gray-700 mb-4">
                        Generate detailed health reports based on analysis results and provide professional health recommendations to help pet owners develop appropriate care plans.
                    </p>
                    <ul className="space-y-2 mb-6">
                        <li><i className="fas fa-check-circle text-blue-500 mr-2"></i> Detailed heart rhythm analysis report</li>
                        <li><i className="fas fa-check-circle text-blue-500 mr-2"></i> Personalized health recommendations</li>
                        <li><i className="fas fa-check-circle text-blue-500 mr-2"></i> Historical data comparison and trend analysis</li>
                        <li><i className="fas fa-check-circle text-blue-500 mr-2"></i> Downloadable and shareable PDF reports</li>
                        <li><i className="fas fa-check-circle text-blue-500 mr-2"></i> Regular health summary reminders</li>
                    </ul>
                    <Button disabled={false} name="Log in to view" type="action" actionFunction={action} className="m-2 border-2 bg-blue-500 text-white font-bold group relative inline-block rounded-2xl h-12 w-30 hover:bg-blue-600 hover:scale-110 duration-300 ease-in-out"></Button>

                </div>
            </div>
        </div>
    )
}

function FutureWork() {
    return (
        <div className='flex justify-center w-full mb-5'>
            <div className="future-products-container py-12 text-center">
                <div className="section-title mb-6">
                    <span className="text-3xl text-blue-500 font-bold mb-5 inline-block">Future products</span>
                    <p className="text-gray-600">We are developing more innovative products. Stay tuned!</p>
                </div>
                <div className="flex justify-center items-center h-48">
                    <p className="text-lg text-gray-500">
                        More innovative products coming soon—stay updated with our latest news!
                    </p>
                </div>
            </div>
        </div>
    )
}