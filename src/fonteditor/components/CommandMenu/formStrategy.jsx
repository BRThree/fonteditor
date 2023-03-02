import AdjustPos from './components/AdjustPos';
import AdjustGlyph from './components/AdjustGlyph';
import SettingFont from './components/SettingFont';
import DownloadGlyf from './components/DownloadGlyf';
import SettingUnicode from './components/SettingUnicode';
import React from 'react';

const formStrategy = {
  'adjust-pos': (form) => (
    <AdjustPos
      bindRef={(r) => {
        form.current = r;
      }}
    />
  ),
  'adjust-glyph': (form) => (
    <AdjustGlyph
      bindRef={(r) => {
        form.current = r;
      }}
    />
  ),
  'setting-font': (form) => (
    <SettingFont
      bindRef={(r) => {
        form.current = r;
      }}
    />
  ),
  'download-glyf': () => <DownloadGlyf />,
  'setting-unicode': (form) => {
    return (
      <SettingUnicode
        bindRef={(r) => {
          form.current = r;
        }}
      />
    )
  },
  default: () => 'default',
};

export default formStrategy;
