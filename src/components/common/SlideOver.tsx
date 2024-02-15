import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { HiOutlineXMark } from "react-icons/hi2";
import { ProfileListMap } from "./ProfileListMap";
import { IProfile } from "types/profile.type";
import SearchInputField from "./SearchInputField";
import { useAppSelector } from "../../store/hooks";

type SlideOverProps = {
  isOpen?: boolean;
  onClose: () => void;
  onChildData: (data: IProfile[]) => void;
};

export const SlideOver: React.FC<SlideOverProps> = ({
  isOpen = false,
  onClose,
  onChildData,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const profiles = useAppSelector((state) => state.teratany_page.profiles!);

  const [searchedProfile, setSearchedProfile] = useState<IProfile[]>(profiles);

  const searchProfile = useCallback(() => {
    let resultats = profiles.filter((profile) => {
      return profile?.name?.toLowerCase().includes(searchQuery?.toLowerCase()!);
    });
    setSearchedProfile(resultats);
    onChildData(resultats);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profiles, searchQuery]);

  useEffect(() => {
    searchProfile();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profiles, searchQuery]);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-1000" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-[5.7rem]">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-800 bg-gray-800"
                        onClick={onClose}
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <HiOutlineXMark
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-4">
                      <SearchInputField
                        onChange={(e) => setSearchQuery(e)}
                        searchQuery={searchQuery}
                      />
                    </div>
                    <div className="relative mt-2 flex-1 overflow-y-scroll">
                      <ProfileListMap
                        profiles={searchedProfile}
                        onCloseSlideOver={onClose}
                      />
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
