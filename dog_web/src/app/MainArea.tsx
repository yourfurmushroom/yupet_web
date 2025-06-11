import Button from "@/Componant/Button"
import { LoginStatus } from "@/Componant/Interface"
import { useEffect, useState } from "react"

export default function MainArea({isUserLogin,setUserLogin,setLogin,setRegister,setShowWeb,userName}:LoginStatus) {

    return (
        <>
            <Hero isUserLogin={isUserLogin} setRegister={setRegister} setShowWeb={setShowWeb}></Hero>
            <StatsArea></StatsArea>
            <Features></Features>
            <HowToUse></HowToUse>
            <UserTry></UserTry>
            <TakeAction isUserLogin={isUserLogin} setRegister={setRegister}></TakeAction>
        </>
    )
}

function Hero({isUserLogin,setRegister,setShowWeb}:LoginStatus) {
    return (
        <div >
            <div className="w-full relative bg-cover bg-center bg-no-repeat transition-opacity" style={{ backgroundImage: `url('./dog_health_illustration.jpeg')` }}>
                <div className="absolute inset-0 bg-blue-500 opacity-60"></div>
                <div className="relative z-10 flex flex-col items-center">
                    <span className="w-[100%] text-white text-[40px] flex justify-center pt-[5%] mb-5">AI-powered pet arrhythmia analysis platform</span>
                    <span className="w-[80%] text-white text-[20px] flex justify-center text-center mb-5">Yupet utilizes advanced artificial intelligence technology to provide precise analysis of pet electrocardiograms, helping owners monitor their pets' heart rhythms in real-time, detect potential issues early, and protect the health of your furry companions.</span>
                    <div className="flex gap-5 w-full justify-center mb-12">
                        {!isUserLogin&&<Button type="action" disabled={false} actionFunction={setRegister} className="blink-border-button bg-orange-600 text-white w-[10%] h-13 rounded-3xl hover:bg-orange-700 duration-300 ease-in-out" name="Register Now"></Button>}
                        <Button type="action" disabled={false} actionFunction={() => setShowWeb("Services") } className=" bg-blue-400 text-white w-[10%] h-13 rounded-3xl border-2 border-blue-300 hover:bg-blue-700 duration-300 ease-in-out" name="Learn More"></Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
function StatsArea() {
    return (
        <div className="w-full h-1/2 py-24 bg-blue-400 mb-16">
            <div className="flex justify-center space-x-10">
                <StatItem number={5000} label="Pet owner user" />
                <StatItem number={98} label="Analysis accuracy" />
                <StatItem number={24} label="24/7 monitoring" />
                <StatItem number={3000} label="Success stories" />
            </div>

        </div>
    )
}

function StatItem({ number, label }: { number: number, label: string }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let targetCount = number;
        let currentCount = 0;
        const interval = setInterval(() => {
            if (currentCount < targetCount) {
                currentCount += 100; // 設定每次增加的數字
                if (currentCount > targetCount) currentCount = targetCount; // 防止超過目標數字
                setCount(currentCount);
            } else {
                clearInterval(interval); // 停止計數器
            }
        }, 30); // 設定動畫的速度

        return () => clearInterval(interval); // 清理定時器
    }, [number]);

    return (
        <div className="stat-item text-center">
            <div className="stat-number text-3xl font-bold text-white">
                {count.toLocaleString()}+
            </div>
            <div className="stat-label text-lg text-white">{label}</div>
        </div>
    );
}

function Features() {
    return (
        <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800">Platform Features</h2>
            <p className="text-lg text-gray-600 mt-4">Yupet offers comprehensive pet heart health monitoring services, allowing you to keep track of your beloved pet’s health anytime.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 mt-8">
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                    <div className="feature-image mb-4">
                        <img className="w-full h-48 object-cover rounded-md" src="./dog_health_illustration.jpeg" alt="AI 分析" />
                    </div>
                    <div className="feature-content">
                        <span className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                            <i className="fas fa-brain text-blue-500"></i> AI-powered precise analysis
                        </span>
                        <p className="text-gray-600 mt-2">
                            Utilizing advanced artificial intelligence technology to precisely analyze pets' electrocardiogram data and quickly identify potential arrhythmia issues.
                        </p>
                    </div>
                </div>

                {/* Feature Card 2 */}
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                    <div className="feature-image mb-4">
                        <img className="w-full h-48 object-cover rounded-md" src="./dog_paw.jpeg" alt="即時監測" />
                    </div>
                    <div className="feature-content">
                        <span className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                            <i className="fas fa-heartbeat text-red-500"></i> Real-time health monitoring
                        </span>
                        <p className="text-gray-600 mt-2">
                            By uploading electrocardiogram (ECG) data, monitor your pet's heart health in real-time to detect potential issues early and prevent disease progression.
                        </p>
                    </div>
                </div>

                {/* Feature Card 3 */}
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                    <div className="feature-image mb-4">
                        <img className="w-full h-48 object-cover rounded-md" src="./vet_with_dog.jpeg" alt="專業建議" />
                    </div>
                    <div className="feature-content">
                        <span className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                            <i className="fas fa-stethoscope text-green-500"></i> Professional health advice
                        </span>
                        <p className="text-gray-600 mt-2">
                            Provide professional health advice based on analysis results to help pet owners develop appropriate care plans and ensure their pets' health.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function HowToUse() {
    return (
        <div className="text-center mb-16">
            <div className="section-title mb-8">
                <h2 className="text-3xl font-bold text-gray-800">How to Use</h2>
                <p className="text-lg text-gray-600 mt-4">Three simple steps to easily monitor your pet’s heart health</p>
            </div>
            <div className="workflow-steps flex flex-col sm:flex-row justify-center gap-8 w-[80%] mx-auto">
                {/* Step 1 */}
                <div className="workflow-step floating-animation bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all items-center">
                    <div className="flex justify-center mb-5">
                        <div className="step-number text-4xl font-semibold text-white bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center  top-0 left-0 -translate-x-2 -translate-y-2">
                            1
                        </div>
                    </div>
                    <div className="flex justify-center gap-2">
                        <i className="fas fa-user-plus text-blue-500"></i> 
                        <span className="text-xl font-semibold text-blue-500 flex items-center gap-2">
                            Register an account
                        </span>
                    </div>
                    <p className="text-gray-600 mt-2">
                        Create your personal account, enter basic information and pet details, and start using the Yupet platform services.
                    </p>
                </div>

                {/* Step 2 */}
                <div className="workflow-step floating-animation bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all relative" style={{ animationDelay: '0.5s' }}>
                    <div className="flex justify-center mb-5">
                        <div className="step-number text-4xl font-semibold text-white bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center  top-0 left-0 -translate-x-2 -translate-y-2">
                            2
                        </div>
                    </div>
                    <div className="flex justify-center gap-2">
                        <i className="fas fa-user-plus text-blue-500"></i> 
                        <span className="text-xl font-semibold text-blue-500 flex items-center gap-2">
                        Upload data
                        </span>
                    </div>
                    <p className="text-gray-600 mt-2">
                        Upload your pet's ECG CSV file, and the system will automatically process and analyze the data.
                    </p>
                </div>

                {/* Step 3 */}
                <div className="workflow-step floating-animation bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all relative" style={{ animationDelay: '1s' }}>
                    <div className="flex justify-center mb-5">
                        <div className="step-number text-4xl font-semibold text-white bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center  top-0 left-0 -translate-x-2 -translate-y-2">
                            3
                        </div>
                    </div>
                    <div className="flex justify-center gap-2">
                        <i className="fas fa-user-plus text-blue-500"></i> 
                        <span className="text-xl font-semibold text-blue-500 flex items-center gap-2">
                        View results
                        </span>
                    </div>
                    <p className="text-gray-600 mt-2">
                        View analysis results and health recommendations on your personal dashboard to keep track of your pet’s heart health
                    </p>
                </div>
            </div>
        </div>
    );
}

function UserTry()
{
    return (
        <div className="container mx-auto px-6 py-12">
          {/* Section Title */}
          <div className="section-title text-center mb-10">
            <h2 className="text-3xl font-bold text-blue-500">User Testimonials</h2>
            <p className="text-lg text-gray-600 mt-4">Hear what our users have to say</p>
          </div>
    
          {/* Testimonial Slider */}
          <div className="testimonial-slider flex justify-center">
            <div className="testimonial-card bg-white p-6 rounded-xl shadow-lg w-full sm:w-80 text-center">
              {/* User Avatar */}
              <img src="./vet_with_dog.jpeg" alt="用戶頭像" className="testimonial-avatar w-24 h-24 rounded-full mx-auto mb-6" />
              
              {/* User Testimonial */}
              <div className="testimonial-quote text-gray-700 text-base italic mb-6">
                "The Yupet platform helped me detect my Lucky's heart rhythm issue early. After timely treatment, he has fully recovered. This platform is truly a great helper for pet owners!"
              </div>
              
              {/* Author and Role */}
              <div className="testimonial-author text-xl font-semibold text-blue-500">Joe</div>
              <div className="testimonial-role text-gray-500">Owner of Lucky, the Golden Retriever</div>
            </div>
          </div>
        </div>
      );
}

function TakeAction({isUserLogin,setRegister}:LoginStatus)
{
    return (
        <div className="w-full relative bg-cover bg-center bg-no-repeat transition-opacity" style={{ backgroundImage: `url("./vet_with_dog.jpeg")` }}>
                <div className="absolute inset-0 bg-orange-700 opacity-60"></div>
                <div className="relative z-10 flex flex-col items-center">
                    <span className="w-[100%] text-white text-[40px] flex justify-center pt-[5%] mb-5">Start monitoring your pet’s heart health now</span>
                    <span className="w-[80%] text-white text-[20px] flex justify-center text-center mb-5">Register on the Yupet platform to use AI technology for analyzing your pet’s heart rhythm, detect potential issues early, and give your pet a healthier life.</span>
                    <div className="flex w-full justify-center mb-12">
                        {!isUserLogin&&<Button type="action" disabled={false} actionFunction={setRegister} className="blink-border-button bg-orange-600 text-white w-[10%] h-13 rounded-3xl hover:bg-orange-700 duration-300 ease-in-out" name="立即註冊"></Button>}
                    </div>
                </div>
            </div>
      );
}