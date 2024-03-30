'use client'
import React, { useState, useRef, useEffect } from 'react';
import Menu from './Menu';
import { FaCheck, FaParagraph, FaFileImage } from "react-icons/fa";
import { LuHeading1, LuHeading2, LuHeading3 } from "react-icons/lu";
import { RxDividerHorizontal } from "react-icons/rx";
import { MdFormatListBulleted } from "react-icons/md";
import { TiAttachmentOutline } from "react-icons/ti";
import { TbListNumbers } from "react-icons/tb";
import { LuBoxSelect as DefaultIcon } from 'react-icons/lu';

type FormatColorType = {
  [key: string]: string; // This says each key is a string and maps to a string value
};

type FormatIconMapType = {
  [key: string]: React.ElementType;
}

export default function Editor() {
  const [currentInput, setCurrentInput] = useState<string>('');
  const [selectedFormat, setSelectedFormat] = useState('Paragraph');
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleFormatSelect = (format: any) => {
    setSelectedFormat(format); // Update the selected format
  };

  const toggleMenuVisibility = () => setIsMenuVisible(!isMenuVisible);

  // Adjust textarea height based on its content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '0px'; // Reset height to recalculate
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set to scroll height
    }
  }, [currentInput]);

  const formatColors: FormatColorType = {
    'Task': 'flex items-start text-lg bg-red-100',
    'Paragraph': 'flex items-start text-lg bg-red-200',
    'Heading 1': 'flex items-start text-2xl bg-green-300',
    'Heading 2': 'flex items-start text-lg bg-blue-400',
    'Heading 3': 'flex items-start text-lg bg-yellow-500',
    'Divider': 'flex items-start text-lg bg-red-600',
    'Bullet List': 'flex items-start text-lg bg-purple-700',
    'Numbered List': 'flex items-start text-lg bg-red-800',
    'Image': 'flex items-start text-lg bg-red-900',
    'Attachment': 'flex items-start text-lg bg-blue-500',
  };

  const bgColor = formatColors[selectedFormat] || ''; // Fallback to an empty string if the format isn't found

  // Map your formats to the respective icons
  const iconMap: FormatIconMapType =  {
    'Task': FaCheck,
    'Paragraph': FaParagraph,
    'Heading 1': LuHeading1,
    'Heading 2': LuHeading2,
    'Heading 3': LuHeading3,
    'Divider': RxDividerHorizontal,
    'Bullet List': MdFormatListBulleted, // Corrected to match the formatColors keys
    'Numbered List': TbListNumbers, // Corrected to match the formatColors keys
    'Image': FaFileImage,
    'Attachment': TiAttachmentOutline,
  };

  // Dynamically select the icon component based on the selected format
  const IconComponent = iconMap[selectedFormat] || DefaultIcon; // Directly use DefaultIcon as fallback

  return (
    <div className={`${bgColor}`}>
      <div className='relative pt-1'>
        {isMenuVisible && (
          <div className="absolute left-0 transform -translate-x-full mt-1 w-40">
            <Menu onSelect={handleFormatSelect} />
          </div>
        )}
        <IconComponent className='text-xl text-white cursor-pointer' onClick={toggleMenuVisibility} />
      </div>
      <textarea
        ref={textareaRef}
        value={currentInput}
        onChange={(e) => setCurrentInput(e.target.value)}
        className="flex-1 text-white bg-transparent rounded-md border-none outline-none resize-none ml-2"
        placeholder="Add a new item"
        style={{ overflowY: 'hidden', minHeight: '20px' }}
      ></textarea>
    </div>
  );
}
