import React from 'react';
import { Select } from 'antd';
import { DropdownMenuProps } from '../models/Interfaces';

const DropdownMenu: React.FC<DropdownMenuProps> = ({
	status,
	onStatusChange,
}) => {
	const handleChange = (value: string) => {
		onStatusChange(value);
	};

	return (
		<Select defaultValue={status} onChange={handleChange}>
			<Select.Option value="pending">Pending</Select.Option>
			<Select.Option value="complete">Complete</Select.Option>
		</Select>
	);
};

export default DropdownMenu;
