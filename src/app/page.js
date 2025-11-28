import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import TaskColumn from '../components/TaskColumn';
import TaskCard from '../components/TaskCard';

export default function Home() {
  return (
    <main className="flex h-screen bg-[#F6F7FB] overflow-hidden font-sans text-gray-800">
      <Sidebar />

      {/* Main Content Area */}
      <section className="flex-1 p-8 h-screen flex flex-col">
        <Header />

        {/* Grid Container */}
        <div className="grid grid-cols-3 gap-8 flex-1 overflow-hidden pb-4">

          {/* --- KOLOM 1: WORK --- */}
          <TaskColumn title="Work" colorClass="bg-blue-500" completed={1} total={3}>
            <TaskCard title="Meeting with a client" desc="John Doe from TechX company" time="12:00 - 13:00" type="work" />
            <TaskCard title="WebHeroes" desc="Prepare new screen for D-Form" time="Until 16:00" type="work" />

            {/* Pembatas Done */}
            <div className="border-t-2 border-dashed border-gray-200 my-4 relative">
              <span className="absolute left-1/2 -top-3 -translate-x-1/2 bg-[#F6F7FB] px-2 text-xs text-gray-400 font-bold">DONE</span>
            </div>

            <TaskCard title="Trustedoctor" desc="Make all fixes" time="8:00 - 12:00" type="work" isDone={true} />
          </TaskColumn>

          {/* --- KOLOM 2: HOME --- */}
          <TaskColumn title="Home" colorClass="bg-yellow-500" completed={0} total={3}>
            <TaskCard title="Grocery shopping" desc="Shopping list: 2 x Rolls, apple juice." time="17:00 - 18:00" type="home" />
            <TaskCard title="Dinner" desc="Chicken wings & hot sauce." time="20:00 - 21:00" type="home" />
            <TaskCard title="Walk the dog" desc="Keliling UDINUS aja bentar" time="22:00 - 23:00" type="home" />
          </TaskColumn>

          {/* --- KOLOM 3: OTHER --- */}
          <TaskColumn title="Other" colorClass="bg-purple-500" completed={0} total={2}>
            <TaskCard title="Meeting with friends" desc="At Green Beer Pub" time="From 23:00" type="other" />

            {/* Pembatas Done */}
            <div className="border-t-2 border-dashed border-gray-200 my-4 relative">
              <span className="absolute left-1/2 -top-3 -translate-x-1/2 bg-[#F6F7FB] px-2 text-xs text-gray-400 font-bold">DONE</span>
            </div>

            <TaskCard title="Give camera back" desc="Return to Michael" time="Until 10:00" type="done" isDone={true} />
          </TaskColumn>

        </div>
      </section>
    </main>
  );
}