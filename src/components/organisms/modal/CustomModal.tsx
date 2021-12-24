import { Dialog, Transition } from '@headlessui/react'
import { Fragment, memo, ReactNode, VFC } from 'react'

type Props = {
  title: string
  children: ReactNode
  isOpen: boolean
  closeModal: () => void
  width?: string
  mdWidth?: string
}

export const CustomModal: VFC<Props> = memo(
  ({ title, children, isOpen, closeModal, width = 'w-96', mdWidth }) => {
    return (
      <div className="fixed">
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={closeModal}
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed bg-gray-500 z-20 opacity-50 inset-0" />
              </Transition.Child>
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div
                  className={`${width} ${mdWidth} z-30 inline-block fixed top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2 text-gray-500 bg-gray-50 md:p-6 px-6 py-3 my-8 overflow-hidden text-left align-middle transition-all shadow-xl rounded-md`}
                >
                  <Dialog.Title
                    as="h3"
                    className="text-xl text-center font-semibold leading-6 md:mb-5"
                  >
                    {title}
                  </Dialog.Title>
                  {children}
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    )
  }
)
