import Button from '@/Componant/Button'
import { DashboardSelection, LoginStatus, PetData, RemotePetStatus } from '@/Componant/Interface';
import React, { useEffect, useState, useTransition } from 'react';
import dynamic from 'next/dynamic';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);



export default function Dashboard({ isUserLogin, userName, sendMessage, showAddPet, setShowAddPet, petData }: LoginStatus & RemotePetStatus & { petData: PetData }) {
    const [currentSelect, setSelect] = useState<string>("overall")

    const remotepet: RemotePetStatus = {
        sendMessage: sendMessage,
        showAddPet: showAddPet,
        setShowAddPet: setShowAddPet,
        userName: userName
    }

    if (isUserLogin)
        return (
            <section className='flex w-full justify-center bg-white'>
                <div className="w-[90%] md:w-[80%] h-auto m-10 rounded-3xl shadow-2xl shadow-black">
                    <WelcomeArea userName={userName} showAddPet={showAddPet} setShowAddPet={setShowAddPet} />
                    {showAddPet && <AddPet userName={userName} setShowAddPet={setShowAddPet} sendMessage={(type: any, args: object) => sendMessage(type, args)}></AddPet>}
                    {(showAddPet) && <div className="fixed inset-0 bg-gray-300 bg-opacity-20 z-20"></div>}
                    <div className="flex flex-col lg:flex-row">
                        <LabelBar currentSelect={currentSelect} setSelect={setSelect} />
                        <MainDashboard currentSelect={currentSelect} remotepet={remotepet} petData={petData} />
                    </div>
                </div>
            </section>
        )
    else {
        window.location.reload()
    }
}


function WelcomeArea({ userName, showAddPet, setShowAddPet }: { userName: any, showAddPet: any, setShowAddPet: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between p-8 bg-blue-500 shadow-md rounded-t-xl w-full mb-10">
            <div className="flex items-center gap-4 w-full">
                <img className="relative inline-block w-14 h-14 rounded-full border-white border-2" src="./dog_paw.jpeg" alt="" />
                <div className='inline-block w-full md:w-[50%]'>
                    <span className="text-[30px] md:text-[40px] font-semibold text-[#2c3e50]">
                        Welcome Back, <span id="username">{userName}</span>
                    </span>
                    <p className="text-sm text-white">
                        View your pet's health status and analysis records
                    </p>
                </div>
                <div className='inline-block w-full md:w-[50%] text-right'>
                    {/* <Button type='action' name="新增分析" disabled={false} actionFunction={() => { }} className="w-full sm:w-30 h-9 border-2 border-white rounded-2xl mr-5 text-white font-bold duration-300 ease-in-out hover:bg-blue-400"></Button> */}
                    <Button type='action' name="New Pet" disabled={false} actionFunction={setShowAddPet} className="w-full sm:w-30 h-9 border-2 border-white rounded-2xl mr-5 text-white font-bold duration-300 ease-in-out hover:bg-blue-400"></Button>
                </div>
            </div>
        </div>
    )
}

function LabelBar({ currentSelect, setSelect }: DashboardSelection) {
    const labels = [
        { key: "overall", icon: "fas fa-home", text: "Overview" },
        { key: "pets", icon: "fas fa-paw", text: "Pet Management" },
        { key: "records", icon: "fas fa-heartbeat", text: "Analysis Records" },
        // { key: "profile", icon: "fas fa-user", text: "個人資料" },
        // { key: "settings", icon: "fas fa-cog", text: "設定" },
    ]

    return (
        // 修改 LabelBar 為水平/垂直響應式布局
        <div className="flex flex-row lg:flex-col bg-gray-300 w-full lg:w-56 h-auto p-2 lg:p-4 overflow-x-auto lg:overflow-x-visible">
            {labels.map((label) => (
                <div
                    key={label.key}
                    className={`flex items-center min-w-max lg:w-full h-10 px-4 rounded cursor-pointer my-1 mx-1 lg:mx-0
                        transition-colors duration-200 
                        ${currentSelect === label.key
                            ? 'bg-blue-400 text-blue-700 font-semibold'
                            : 'hover:bg-blue-400 text-gray-800'}`}
                    onClick={() => setSelect(label.key)}
                >
                    <i className={`${label.icon} mr-2 ${currentSelect === label.key ? 'text-blue-700' : 'text-blue-500'}`} />
                    <span>{label.text}</span>
                </div>
            ))}
        </div>
    )
}

function MainDashboard({ currentSelect, remotepet, petData }: { currentSelect: string, remotepet: RemotePetStatus, petData: PetData }) {
    return (
        <div className="flex justify-between items-center w-[80%] px-10 py-5 border-gray-200 border-2 m-auto rounded-2xl">
            {currentSelect == "overall" && <OverallPage {...remotepet} petData={petData}></OverallPage>}
            {currentSelect == "pets" && <PetManage {...remotepet} petData={petData}></PetManage>}
            {currentSelect == "records" && <RecordsPage {...remotepet} petData={petData}></RecordsPage>}
            {/* {currentSelect == "profile" && <ProfilePage></ProfilePage>} */}
            {/* {currentSelect == "settings" && <SettingPage></SettingPage>} */}

        </div>
    )
}

function OverallPage({ sendMessage, showAddPet, setShowAddPet, userName, petData }: RemotePetStatus & { petData: PetData }) {


    useEffect(() => {
        if (!showAddPet)
            sendMessage("checkPetQuantity", { userName: userName })

    }, [showAddPet])

    return (
        <div className="w-full lg:flex-1 p-6 space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <OverviewCard icon="fas fa-paw" title="Number of pets" value={petData.petQuantity.toString()} description="Registered pets" />
                <OverviewCard icon="fas fa-chart-line" title="Number of analyses" value={petData.analysisList.length.toString()} description="Completed heart rhythm analyses" />
                {/* <OverviewCard icon="fas fa-heartbeat" title="Average heart rate" value="85 BPM" description="Last 30 days" /> */}
                {/* <OverviewCard icon="fas fa-calendar-check" title="下次檢查" value="3 天" description="建議檢查時間" /> */}
            </div>

            {/* <div className="bg-white p-6 rounded-xl shadow">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">心率趨勢</h3>
                    <div className="space-x-2 mt-2 md:mt-0">
                        <button className="px-3 py-1 rounded bg-blue-500 text-white">7天</button>
                        <button className="px-3 py-1 rounded hover:bg-blue-200">30天</button>
                        <button className="px-3 py-1 rounded hover:bg-blue-200">90天</button>
                    </div>
                </div>
                <div className="w-full h-[300px] bg-gray-100 rounded-lg overflow-hidden flex justify-center items-center">
                    <img src="./dog_health_illustration.jpeg" alt="心率趨勢圖" className="object-contain h-full" />
                </div>
            </div> */}

            {/* <div className="bg-white p-6 rounded-xl shadow">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">最近活動</h3>
                    <a href="#records" className="text-blue-500 hover:underline">查看全部</a>
                </div>
                <ul className="space-y-4"> */}
            {/* <ActivityItem
                        icon="fas fa-file-medical"
                        title="Lucky 的心律分析完成"
                        time="今天 14:30"
                    />
                    <ActivityItem
                        icon="fas fa-paw"
                        title="更新了 DogDay 的資料"
                        time="昨天 09:15"
                    />
                    <ActivityItem
                        icon="fas fa-file-medical"
                        title="DogDay 的心律分析完成"
                        time="3 天前"
                    /> */}
            {/* </ul> */}
            {/* </div> */}
        </div>
    )
}

function OverviewCard({ icon, title, value, description }: { icon: string, title: string, value: string, description: string }) {
    return (
        <div className="bg-white p-5 rounded-xl shadow flex flex-col gap-2">
            <div className="flex items-center gap-3">
                <div className="text-blue-500 text-2xl">
                    <i className={icon}></i>
                </div>
                <h3 className="text-lg font-medium">{title}</h3>
            </div>
            <div className="text-3xl font-bold">{value}</div>
            <div className="text-sm text-gray-500">{description}</div>
        </div>
    )
}

function ActivityItem({ icon, title, time }: { icon: string, title: string, time: string }) {
    return (
        <li className="flex items-start gap-4">
            <div className="text-blue-500 text-xl">
                <i className={icon}></i>
            </div>
            <div>
                <div className="font-medium">{title}</div>
                <div className="text-sm text-gray-500">{time}</div>
            </div>
        </li>
    )
}
const redirectToShowAddPet = (setShowAddPet: React.Dispatch<React.SetStateAction<boolean>>) => {
    setShowAddPet(prev => !prev)
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
function PetManage({ sendMessage, showAddPet, setShowAddPet, petData }: RemotePetStatus & { petData: PetData }) {

    var petlist = petData.petList
    // console.log(petlist)
    return (

        <div className='w-full'>
            <div className='w-full overflow-scroll h-[60rem]'>
                <h2 className="pets-title text-2xl font-semibold">My Pet</h2>
                {GeneratePetRow(petlist)}
            </div>
            <div className=''>
                <Button type="action" disabled={false} actionFunction={() => { redirectToShowAddPet(setShowAddPet) }} name="+ New Pet" className='w-30 h-10 bg-blue-500 text-white rounded-lg hover:bg-blue-600 duration-300 ease-in-out' />
            </div>
        </div>


    )
}

function GeneratePetRow(petlist: any) {
    var list = JSON.parse(petlist)
    console.log(list)
    return (
        <>
            <PetDetailRow name={'Pet Name'} type={'Pet species'} age={'Age'} weight={'Weight'} sex={'Gender'} note={'Note'} isStatic={true} />
            {list.map((pet: any, index: any) => (
                <PetDetailRow key={index} name={pet.name} type={pet.type} age={pet.age} weight={pet.weight} sex={pet.sex} note={pet.note} isStatic={false} />
            ))}
        </>
    );
}

function PetDetailRow({ rowkey, name, type, age, weight, sex, note, isStatic }: any) {
    return (
        <div key={rowkey} className={`flex justify-center items-center w-full h-14 border-2 border-black rounded-2xl mb-3 ${!isStatic && 'hover:scale-105 hover:bg-blue-400 duration-300 ease-in-out'}`}>
            <div className={' inline-block w-[10%] mx-auto text-center font-bold '}>{name}</div>
            <div className=' inline-block w-[10%] mx-auto text-center font-bold'>{type}</div>
            <div className=' inline-block w-[10%] mx-auto text-center font-bold'>{age}</div>
            <div className=' inline-block w-[10%] mx-auto text-center font-bold'>{weight}</div>
            <div className=' inline-block w-[10%] mx-auto text-center font-bold'>{sex}</div>
            <div className=' inline-block w-[10%] mx-auto text-center font-bold'>{note}</div>
        </div>
    )
}

function PetDetailsModal({
  petName,
  petData,
  setShowDetails,
  setGraphData,
  setShowGraph,
}: {
  petName: string;
  petData: PetData;
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
  setGraphData: React.Dispatch<React.SetStateAction<string>>;
  setShowGraph: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const petRecords = petData.analysisList.filter((x: any) => x['petname'] === petName);

  // 處理點擊背景關閉模態視窗
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowDetails(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleBackgroundClick}
    >
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">{petName} Records</h2>
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left bg-gray-200">
              <th className="p-2">Date</th>
              <th className="p-2">Name</th>
              {/* <th className="p-2">心率</th>
              <th className="p-2">節律</th> */}
              <th className="p-2">Status</th>
              <th className="p-2">Graph</th>
            </tr>
          </thead>
          <tbody>
            {petRecords.map((x: any, index: number) => (
              <tr key={index}>
                <td className="p-2">{x['time']}</td>
                <td className="p-2">{x['petname']}</td>
                <td className="p-2">{x['status'] ?? "nan"}</td>
                <td className="p-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => {
                      setGraphData(x['data']);
                      setShowGraph(true);
                    }}
                  >
                    Show Graph
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => setShowDetails(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
}
function RecordsPage({ sendMessage, showAddPet, setShowAddPet, petData }: RemotePetStatus & { petData: PetData }) {
  const [petFilter, setPetFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('1000');
  const [showGraph, setShowGraph] = useState<boolean>(false);
  const [graphData, setGraphData] = useState<string>("");
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [selectedPet, setSelectedPet] = useState<string>("");

  const handlePetFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPetFilter(event.target.value);
  };

  const handleTimeFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeFilter(event.target.value);
  };

  // 獲取唯一寵物名稱並檢查狀態
  const uniquePets = Array.from(new Set(petData.analysisList.map((x: any) => x['petname']))).map((petName: string) => {
    const hasIssue = petData.analysisList
      .filter((x: any) => x['petname'] === petName)
      .some((x: any) => x['status'] !== 'N');
    return { petName, hasIssue };
  });

  // 過濾寵物列表
  const filteredPets = uniquePets.filter((pet) => petFilter === 'all' || pet.petName === petFilter);

  // 根據時間過濾
  const now = Date.now();
  const timeThreshold = now - Number(timeFilter) * 24 * 60 * 60 * 1000;
  const filteredPetData = {
    ...petData,
    analysisList: petData.analysisList.filter((x: any) => {
      const timestamp = new Date(x['time'].replace(' ', 'T')).getTime();
      return timestamp >= timeThreshold;
    }),
  };

  return (
    <div className="tab-content w-full" id="records">
      {showGraph && <ECGGraphArea graphData={graphData} setShowGraph={setShowGraph} />}
      {showDetails && (
        <PetDetailsModal
          petName={selectedPet}
          petData={filteredPetData}
          setShowDetails={setShowDetails}
          setGraphData={setGraphData}
          setShowGraph={setShowGraph}
        />
      )}
      <div className="records-header flex justify-between items-center p-4 bg-gray-100 rounded-t-lg">
        <h2 className="records-title text-2xl font-semibold">Pet Record</h2>
        {/* <div className="records-filter flex gap-4">
          <select
            id="petFilter"
            value={petFilter}
            onChange={handlePetFilterChange}
            className="p-2 border rounded-lg bg-white"
          >
            <option value="all">所有寵物</option>
            {generatePetOption(petData.petList)}
          </select>
          <select
            id="timeFilter"
            value={timeFilter}
            onChange={handleTimeFilterChange}
            className="p-2 border rounded-lg bg-white"
          >
            <option value={1000}>所有時間</option>
            <option value={7}>最近7天</option>
            <option value={30}>最近30天</option>
            <option value={90}>最近90天</option>
          </select>
        </div> */}
      </div>

      <div className="pet-list mt-6">
        {/* <h3 className="text-xl font-semibold mb-4">寵物列表</h3> */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPets.map((pet: { petName: string; hasIssue: boolean }, index: number) => (
            <li
              key={index}
              className={`p-4 rounded-lg flex justify-between items-center cursor-pointer ${
                pet.hasIssue ? 'bg-red-100' : 'bg-gray-100'
              }`}
              onClick={() => {
                setSelectedPet(pet.petName);
                setShowDetails(true);
              }}
            >
              <span className="text-lg">{pet.petName}</span>
              <div className="flex items-center gap-2">
                {pet.hasIssue && <span className="text-red-600 font-semibold">ALERT!!</span>}
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={() => {
                    setSelectedPet(pet.petName);
                    setShowDetails(true);
                  }}
                >
                  Show Details
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
    ssr: false,
});

function ECGGraphArea({ graphData, setShowGraph }: { graphData: string, setShowGraph: React.Dispatch<React.SetStateAction<boolean>> }) {
    // Parse the graphData string to extract the data array
    let dataArray: number[] = [];
    try {
        const parsedData = JSON.parse(graphData);
        dataArray = parsedData.data || [];
    } catch (error) {
        console.error('Error parsing graphData:', error);
    }

    // Generate labels for x-axis (assuming sequential points)
    const labels = dataArray.map((_, index) => `${index + 1}`);

    // Chart.js data configuration
    const chartData = {
        labels,
        datasets: [
            {
                label: 'ECG Data',
                data: dataArray,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.4,
                pointRadius: 0, // Remove points for cleaner line
            },
        ],
    };

    // Chart.js options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'ECG Line Chart',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Sample Index',
                },
                ticks: {
                    stepSize: 10,
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Amplitude',
                },
            },
        },
    };

    return (
        <>
            {window.scrollTo({ top: 0, behavior: 'smooth' })}
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-300 backdrop-blur-sm opacity-50" onClick={() => { setShowGraph(prev => !prev) }}>
            </div>
            <div className="absolute z-150 w-[90%] transform -translate-x-[25%] -translate-y-[30%] max-h-[95vh] overflow-y-auto px-3 bg-white rounded-lg shadow-xl">
                <div className="flex justify-end m-5">
                    <Button disabled={false} type="action" name="x" actionFunction={() => { setShowGraph(prev => !prev) }} className=" absolute font-bold text-3xl" />
                </div>
                <div className='w-full'>
                    <Line data={chartData} options={options} />
                </div>
            </div>
        </>
    );
}

function generatePetOption(petList: any) {
    return (
        JSON.parse(petList).map((x: any, index: any) => {
            return (
                <option key={index} value={x.name}>
                    {x.name}
                </option>
            )
        })
    )
}

const controlGraphData = (setGraphData: React.Dispatch<React.SetStateAction<string>>, setShowGraph: React.Dispatch<React.SetStateAction<boolean>>, x: string) => {
    setGraphData(x)
    console.log(x)
    setShowGraph(prev => !prev)
}
function generateRow(itemsList: any, petFilter: any, timeFilter: any, setGraphData: React.Dispatch<React.SetStateAction<string>>, setShowGraph: React.Dispatch<React.SetStateAction<boolean>>) {
    try {
        const now = Date.now();
        const timeThreshold = now - timeFilter * 24 * 60 * 60 * 1000;

        const filteredList = itemsList.filter((x: any) => {
            const timestamp = new Date(x['time'].replace(' ', 'T')).getTime();
            const matchPet = petFilter === "all" || x['petname'] === petFilter;
            const matchTime = timestamp >= timeThreshold;
            return matchPet && matchTime;
        });

        return filteredList.map((x: any, index: number) => {
            return (
                <tr key={index}>
                    <td>{x['time']}</td>
                    <td>{x['petname']}</td>
                    <td>{x['heartrate'] ?? "nan"}</td>
                    <td>{x['rhythm'] ?? "nan"}</td>
                    <td>{x['status'] ?? "nan"}</td>
                    <td>
                        <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => { controlGraphData(setGraphData, setShowGraph, x['data']) }}>View Graph</button>
                    </td>
                </tr>
            )
        });
    } catch (e) {
        console.error("Error generating rows:", e);
        return [];
    }
}


function ProfilePage() {
    const [realName, setRealName] = useState('王小明');
    const [email, setEmail] = useState('user0001@example.com');
    const [phone, setPhone] = useState('0912-345-678');
    const [address, setAddress] = useState('701台南市東區大學路1號');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // 處理表單提交邏輯
        console.log('Profile updated:', { realName, email, phone, address });
    };

    return (
        <div className="tab-content" id="profile">
            <h2 className="text-2xl font-semibold mb-4">個人資料</h2>
            <div className="profile-container">
                <form id="profileForm" onSubmit={handleSubmit}>
                    <div className="form-group mb-4">
                        <label htmlFor="realName" className="block text-sm font-medium">真實姓名</label>
                        <input
                            type="text"
                            id="realName"
                            name="realName"
                            value={realName}
                            onChange={(e) => setRealName(e.target.value)}
                            className="form-control p-2 w-full border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="profileUsername" className="block text-sm font-medium">用戶名稱</label>
                        <input
                            type="text"
                            id="profileUsername"
                            name="username"
                            value="user0001"
                            readOnly
                            className="form-control p-2 w-full border border-gray-300 rounded-lg bg-gray-100"
                        />
                        <small className="form-text text-muted text-xs">用戶名稱無法修改</small>
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="email" className="block text-sm font-medium">電子郵件</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control p-2 w-full border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="phone" className="block text-sm font-medium">電話號碼</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="form-control p-2 w-full border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="address" className="block text-sm font-medium">地址</label>
                        <textarea
                            id="address"
                            name="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="form-control p-2 w-full border border-gray-300 rounded-lg"
                            rows={3}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary p-3 w-full bg-blue-500 text-white rounded-lg hover:bg-blue-600 duration-300 ease-in-out"
                    >
                        儲存變更
                    </button>
                </form>
            </div>
        </div>
    );
}

function SettingPage() {
    const [themeMode, setThemeMode] = useState('light');
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [reportNotifications, setReportNotifications] = useState(true);

    const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setThemeMode(event.target.value);
    };

    const handleEmailNotificationsChange = () => {
        setEmailNotifications(!emailNotifications);
    };

    const handleReportNotificationsChange = () => {
        setReportNotifications(!reportNotifications);
    };

    const handleSaveSettings = () => {
        // 儲存設定的邏輯
        console.log('Settings saved:', { themeMode, emailNotifications, reportNotifications });
    };

    return (
        <div className="tab-content" id="settings">
            <h2 className="text-2xl font-semibold mb-4">設定</h2>
            <div className="settings-container">
                {/* 顯示設定 */}
                <div className="settings-section mb-6">
                    <h3 className="text-xl font-medium mb-2">顯示設定</h3>
                    <div className="form-group mb-4">
                        <label className="block text-sm font-medium mb-2">主題模式</label>
                        <div className="theme-options flex space-x-6">
                            <div className="theme-option flex items-center space-x-2">
                                <input
                                    type="radio"
                                    id="lightMode"
                                    name="themeMode"
                                    value="light"
                                    checked={themeMode === 'light'}
                                    onChange={handleThemeChange}
                                    className="h-4 w-4"
                                />
                                <label htmlFor="lightMode" className="flex items-center">
                                    <i className="fas fa-sun mr-2"></i>
                                    <span>白天模式</span>
                                </label>
                            </div>
                            <div className="theme-option flex items-center space-x-2">
                                <input
                                    type="radio"
                                    id="darkMode"
                                    name="themeMode"
                                    value="dark"
                                    checked={themeMode === 'dark'}
                                    onChange={handleThemeChange}
                                    className="h-4 w-4"
                                />
                                <label htmlFor="darkMode" className="flex items-center">
                                    <i className="fas fa-moon mr-2"></i>
                                    <span>夜間模式</span>
                                </label>
                            </div>
                            <div className="theme-option flex items-center space-x-2">
                                <input
                                    type="radio"
                                    id="systemMode"
                                    name="themeMode"
                                    value="system"
                                    checked={themeMode === 'system'}
                                    onChange={handleThemeChange}
                                    className="h-4 w-4"
                                />
                                <label htmlFor="systemMode" className="flex items-center">
                                    <i className="fas fa-desktop mr-2"></i>
                                    <span>跟隨系統設定</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 通知設定 */}
                <div className="settings-section mb-6">
                    <h3 className="text-xl font-medium mb-2">通知設定</h3>
                    <div className="form-group mb-4">
                        <div className="switch-container flex items-center">
                            <label className="switch flex items-center mr-4">
                                <input
                                    type="checkbox"
                                    id="emailNotifications"
                                    checked={emailNotifications}
                                    onChange={handleEmailNotificationsChange}
                                    className="hidden"
                                />
                                <span className="slider round"></span>
                            </label>
                            <label htmlFor="emailNotifications" className="text-sm">電子郵件通知</label>
                        </div>
                        <small className="form-text text-muted text-xs">接收有關您寵物健康狀況的電子郵件通知</small>
                    </div>
                    <div className="form-group mb-4">
                        <div className="switch-container flex items-center">
                            <label className="switch flex items-center mr-4">
                                <input
                                    type="checkbox"
                                    id="reportNotifications"
                                    checked={reportNotifications}
                                    onChange={handleReportNotificationsChange}
                                    className="hidden"
                                />
                                <span className="slider round"></span>
                            </label>
                            <label htmlFor="reportNotifications" className="text-sm">分析報告通知</label>
                        </div>
                        <small className="form-text text-muted text-xs">接收新的分析報告完成通知</small>
                    </div>
                </div>

                {/* 帳號管理 */}
                <div className="settings-section danger-zone mb-6">
                    <h3 className="text-xl font-medium mb-2">帳號管理</h3>
                    <p className="text-sm text-red-500 mb-2">以下操作將永久影響您的帳號，請謹慎操作。</p>
                    <button type="button" id="btnDeleteAccount" className="btn btn-danger p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 duration-300 ease-in-out">
                        註銷帳號
                    </button>
                    <small className="form-text text-muted text-xs">註銷帳號將刪除所有與您帳號相關的資料，此操作無法復原。</small>
                </div>

                {/* 儲存設定 */}
                <button
                    type="button"
                    id="btnSaveSettings"
                    className="btn btn-primary p-3 w-full bg-blue-500 text-white rounded-lg hover:bg-blue-600 duration-300 ease-in-out"
                    onClick={handleSaveSettings}
                >
                    儲存設定
                </button>
            </div>
        </div>
    );
}

function AddPet({ setShowAddPet, sendMessage, userName }: { setShowAddPet: React.Dispatch<React.SetStateAction<boolean>>, sendMessage: (flag: string, props: any) => void, userName: any }) {
    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [age, setAge] = useState(0)
    const [weight, setWeight] = useState(0)
    const [sex, setSex] = useState("")
    const [note, setNote] = useState("")

    const sendArgs = {
        userName: userName,
        name: name,
        type: type,
        age: age,
        weight: weight,
        sex: sex,
        note: note
    }

    return (

        <div className="absolute top-1/2 left-1/2 w-[45%] h-9/12 bg-white z-50 transform -translate-x-1/2 -translate-y-1/2 rounded-4xl shadow-2xs">
            <div className="flex justify-end  pr-4">
                <Button disabled={false} type="action" name="x" actionFunction={setShowAddPet} className=" absolute font-bold text-3xl text-white" />
            </div>
            <div className="w-[100%] h-[10%] bg-blue-500 rounded-t-2xl flex items-center">
                <div className=" w-[100%] p-5">
                    <h3 className="text-[25px] font-semibold text-white ">新增寵物</h3>
                </div>
            </div>
            <div className="w-[100%] inline-block mx-5 mt-10">
                <div className="mb-5 ">
                    <label>
                        <span className=" text-[18px] font-bold">
                            寵物名稱
                        </span>
                        <div className="flex items-center border rounded px-3 py-2 w-[95%] mt-3">
                            <input
                                type="text"
                                className="outline-none w-full"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                </div>
                <div className="mb-5 ">
                    <label >
                        <span className=" text-[18px] font-bold">
                            品種
                        </span>
                        <div className="flex items-center border rounded px-3 py-2 w-[95%] mt-3">
                            <input
                                type="text"
                                className="outline-none w-full"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                </div>
                <div className="mb-5 w-[48%] inline-block ">
                    <label >
                        <span className=" text-[18px] font-bold">
                            年齡
                        </span>
                        <div className={`flex items-center border rounded px-3 py-2 w-[95%] mt-3 `}>
                            <span className="material-icons text-gray-400 mr-2 "><i className="fas fa-lock" ></i></span>
                            <input
                                type="number"
                                placeholder="請輸入密碼"
                                className="outline-none w-full"
                                value={age}
                                onChange={(e) => setAge(Number(e.target.value))}
                                required
                            />
                        </div>
                    </label>
                </div>

                <div className="mb-5 w-[48%] inline-block">
                    <label >
                        <span className=" text-[18px] font-bold">
                            體重(kg)
                        </span>
                        <div className={`flex items-center border rounded px-3 py-2 w-[95%] mt-3 `}>
                            <span className="material-icons text-gray-400 mr-2 "><i className="fas fa-lock" ></i></span>
                            <input
                                type="number"
                                placeholder="請輸入密碼"
                                className='outline-none w-full'
                                value={weight}
                                onChange={(e) => setWeight(Number(e.target.value))}
                                required
                            />
                        </div>
                    </label>
                </div>

                <div className="mb-5 ">
                    <label >
                        <span className=" text-[18px] font-bold">
                            性別
                        </span>
                        <div className={`flex items-center border rounded px-3 py-2 w-[95%] mt-3 `}>
                            <span className="material-icons text-gray-400 mr-2 "><i className="fas fa-lock" ></i></span>
                            <select
                                className="w-full bg-transparent focus:outline-none"
                                value={sex}
                                onChange={(e) => setSex(e.target.value)}
                                required
                            >
                                <option value="">請選擇</option>
                                <option value="male">公</option>
                                <option value="female">母</option>
                            </select>
                        </div>
                    </label>
                </div>

                <div className="mb-5 ">
                    <label className="block text-sm font-medium">備註</label>
                    <textarea onChange={(e: any) => { setNote(e.target.value) }} value={note} rows={3} className=" w-[95%] border rounded-md px-3 py-2" />
                </div>

            </div>
            <div className='flex justify-center '>
                <Button type="action" disabled={false} name="新增" actionFunction={() => sendMessage("addpet", sendArgs)} className='mr-25 rounded-3xl w-[20%] h-[50px] bg-blue-500 hover:bg-blue-300 text-white font-bold text-center text-[20px] duration-300 ease-in-out' ></Button>
                <Button type="action" disabled={false} name="取消" actionFunction={setShowAddPet} className='rounded-3xl w-[20%] h-[50px] bg-blue-500 hover:bg-blue-300 text-white font-bold text-center text-[20px] duration-300 ease-in-out' ></Button>
            </div>
        </div>

    )
}
