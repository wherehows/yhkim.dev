import styled from '@emotion/styled';
import Sun from '@/assets/sun.svg';
import Moon from '@/assets/moon.svg';
import { ChangeEvent, useLayoutEffect, useState } from 'react';

const DarkModeToggle = () => {
  const [isOn, setIsOn] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.__theme === 'dark' ? true : false;
  });

  const [isMounted, setIsMounted] = useState(false);

  const handleClickCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setIsOn(isChecked);

    window.__setPreferredTheme(isChecked ? 'dark' : 'light');
  };

  useLayoutEffect(() => {
    setIsMounted(true);
  }, []);

  console.log(1);

  return (
    <Wrapper htmlFor="dark-mode-toggle" tabIndex={0}>
      <ToggleBody
        id="dark-mode-toggle"
        type="checkbox"
        checked={isOn}
        onChange={handleClickCheckBox}
      />
      {isMounted ? isOn ? <MoonIcon /> : <SunIcon /> : <></>}
    </Wrapper>
  );
};

const Wrapper = styled('label')(() => ({
  cursor: 'pointer',
}));

const ToggleBody = styled('input')(() => ({
  // WebkitAppearance: 'none',
  // display: 'none',
}));

const SunIcon = styled(Sun)(() => ({
  width: '22px',
  height: '22px',
}));

const MoonIcon = styled(Moon)(() => ({
  width: '22px',
  height: '22px',
  color: '#ffffff',
}));

export default DarkModeToggle;
