import React from 'react';

const Settings = () => {
  return (
    <div className="flex flex-col py-8 pr-8 h-screen">
      <div className="h-full rounded-[20px] bg-white border border-blue-gray-100 dark:bg-maroon-400 dark:border-maroon-600 w-full">
        <div className="p-4">
          <h3 className="text-2xl font-semibold">Settings</h3>
          <ul className="list-disc list-inside mt-2">
            <li>Change password</li>
            <li>Change email</li>
            <li>Change LLM Platform (GROQ, OpenAI, Ollama, HuggingFace)</li>
            <li>Select default LLM model (lama3, gamma, gpt-3.5-turbo, etc...)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Settings;
