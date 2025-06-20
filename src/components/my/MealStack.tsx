import { ForkKnife, Pencil, Plus, Search, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import burgerImg from '@/assets/burger.jpeg'
import pastaImg from '@/assets/pasta.jpg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '../ui/drawer'

export default function MealStack() {
  const photos = [
    {
      id: 1,
      src: burgerImg,
      alt: 'photo 1'
    },
    {
      id: 2,
      src: pastaImg,
      alt: 'photo 2'
    },
    {
      id: 3,
      src: burgerImg,
      alt: 'photo 3'
    }
  ]

  // const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const navigate = useNavigate()
  // 바텀 시트 열기
  // const openSheet = () => {
  //   setIsMenuOpen(true)
  //   document.body.style.overflow = 'hidden' // 배경 스크롤 방지
  // }

  const handlePlusClick = () => {
    setModalOpen(true)
  }

  return (
    <div className="flex items-center justify-center p-2 border-none rounded-lg">
      <div className="relative mb-1">
        {/* <div className="text-center mb-4 text-gray-800 dark:text-gray-200">Today's meals?<span className="text-muted-foreground"> ({photos.length})</span></div> */}

        <div className="flex items-center space-x-[-40px]">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => navigate(`/meals-record/${photo.id}`)}
              className="relative group cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10"
              style={{
                transform: `rotate(${(index % 2 === 0 ? 1 : -1) * (Math.random() * 6 + 2)}deg)`,
                zIndex: photos.length - index
              }}
            >
              <div className="relative w-28 h-34 md:w-40 md:h-48 bg-white dark:bg-black p-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img
                  src={photo.src || '/placeholder.svg'}
                  alt={photo.alt}
                  className="object-cover rounded-md"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-lg" />
              </div>
            </div>
          ))}

          {/* Add Photo Button */}
          <div
            className="relative group cursor-pointer transition-all duration-300 hover:scale-105 hover:z-20"
            style={{
              transform: `rotate(${Math.random() * 6 - 3}deg)`,
              zIndex: 1
            }}
          >
            <Button
              variant="outline"
              onClick={handlePlusClick}
              className="w-28 h-34 md:w-40 md:h-48 bg-white border-2 border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center gap-3"
            >
              <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center transition-colors duration-300">
                <Plus className="w-6 h-6 text-gray-600" />
              </div>
              <span className="text-sm font-medium text-gray-600 group-hover:text-gray-700">
                Add Meals
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* {isMenuOpen && <BottomSheet isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />} */}
      {modalOpen && (
        <Drawer open={modalOpen} onOpenChange={setModalOpen}>
          <DrawerContent className="dark:bg-gray-900 dark:border-gray-800">
            <DrawerHeader>
              <DrawerTitle className="dark:text-white hidden">메뉴</DrawerTitle>
              <DrawerDescription className="dark:text-gray-400 text-sm hidden">
                회원님의 식단을 알려주세요
              </DrawerDescription>
            </DrawerHeader>
            <div className="px-4 pb-4">
              <div className="space-y-4">
                <MenuItem icon={<Pencil className="mr-3 h-5 w-5" />} text="직접 기록하기" />
                <MenuItem icon={<User className="mr-3 h-5 w-5" />} text="코치쌤한테 알리기" />
                <MenuItem icon={<Search className="mr-3 h-5 w-5" />} text="음식 검색하기" />
                <MenuItem icon={<ForkKnife className="mr-3 h-5 w-5" />} text="식단 불러오기" />
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  )
}

// 메뉴 아이템 컴포넌트
function MenuItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <button className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-900 dark:text-gray-100">
      {icon}
      {text}
    </button>
  )
}