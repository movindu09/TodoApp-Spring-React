import React from 'react';
import { Modal } from 'antd';
import { PopModalProps } from '../models/Interfaces';

const PopModal: React.FC<PopModalProps> = ({
	isModalOpen,
	handleOk,
	handleCancel,
	title,
}) => {
	return (
		<Modal
			title="ToDo-List"
			open={isModalOpen}
			onOk={handleOk}
			onCancel={handleCancel}
		>
			<p>{title}</p>
		</Modal>
	);
};

export default PopModal;
