import React, { useState, Fragment, ReactNode } from 'react';
import { Dialog, Transition, DialogPanel, TransitionChild } from '@headlessui/react';
import UploadFile from './UploadFile';
import AddDataSource from './AddDataSource';

interface LayoutProps {
  children: ReactNode;
}

const AddDataSourceModal: React.FC<LayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [component, setComponent] = useState('uploadFile');

  return (
    <>
      <div onClick={() => setIsOpen(true)}>{children}</div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative  z-10" onClose={() => setIsOpen(false)}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div className="fixed  inset-0 overflow-y-auto">
            <div className="flex  min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  {component == 'uploadFile' ? (
                    <UploadFile setComponent={setComponent} setIsOpen={setIsOpen} />
                  ) : (
                    <AddDataSource setComponent={setComponent} />
                  )}
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AddDataSourceModal;