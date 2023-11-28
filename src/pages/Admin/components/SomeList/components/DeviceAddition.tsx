import React, { useState } from 'react'

const DeviceAddition = ({ setAdditions, additions, addition, idx }: { setAdditions: Function, addition: any, idx: number, additions: any[] }) => {

  const [title, setTitle] = useState(addition.title)
  const [description, setDescription] = useState(addition.description)

  const changeTitle = (e: any) => {
    setTitle(e.target.value)
    setAdditions((prev: any) => additions.map((add, index) => {
      // console.log(add, index)
      if (index === idx) {
        add.title = e.target.value
        return add
      } return add
    }))
  }

  const changeDescription = (e: any) => {
    setDescription(e.target.value)
    setAdditions((prev: any) => additions.map((add, index) => {
      if (index === idx) {
        add.description = e.target.value
        return add
      } return add
    }))
  }

  console.log(additions)

  return (
    <div>
      <span className=' bg-white text-333 p-2 rounded-lg '> Заголовок блока </span>
      <input type="text" className=' bg-333 rounded-lg border-2 border-[#222] text-white p-2 w-full mb-3' value={title} onChange={(e) => changeTitle(e)} />
      <span className=' bg-white text-333 p-2 rounded-lg '> Описание блока </span>
      <textarea rows={6} className=' bg-333 rounded-lg border-2 border-[#222] text-white p-2 w-full' value={description} onChange={(e) => changeDescription(e)} />
    </div>
  )
}

export default DeviceAddition