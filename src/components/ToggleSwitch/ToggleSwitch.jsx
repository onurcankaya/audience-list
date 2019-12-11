import React from 'react'
import './ToggleSwitch.css'

const ToggleSwitch = ({ leadsOnly, isLoading, onToggle }) => (
  <div className="toggle-switch-container">
    <h3 className="label">Leads only</h3>
    {isLoading ? (
      <div className="toggle">
        <div className="toggle-handle"></div>
      </div>
    ) : (
      <div
        className={'toggle ' + (leadsOnly ? 'toggle-on' : '')}
        onClick={onToggle}>
        <div className="toggle-handle"></div>
      </div>
    )}
  </div>
)

export default ToggleSwitch
