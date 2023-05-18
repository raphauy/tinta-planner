'use client';

import React, { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { FiAlertTriangle } from 'react-icons/fi'
import Modal from './Modal';
import { toast } from 'react-hot-toast';
import Button from '@/components/ui/Button';

interface ConfirmModalProps {
  isOpen?: boolean
  isDangerStile?: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ 
  isOpen,
  isDangerStile,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div 
          className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10"
        >
          <FiAlertTriangle 
            className="w-6 h-6 text-red-600" 
            aria-hidden="true"
          />
        </div>
        <div 
          className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left"
        >
          <Dialog.Title 
            as="h3" 
            className="text-xl font-semibold leading-6 text-gray-900"
          >
            {title}
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-gray-500 text-md">
              {message}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-row-reverse gap-2 mt-5 sm:mt-4">
        <Button
          disabled={isLoading}
          danger={isDangerStile}
          onClick={() => onConfirm()}
        >
          Eliminar
        </Button>
        <Button
          disabled={isLoading}
          secondary
          onClick={onClose}
        >
          Cancelar
        </Button>
      </div>
    </Modal>
  )
}

export default ConfirmModal;