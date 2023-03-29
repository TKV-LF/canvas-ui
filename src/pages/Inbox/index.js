import Typography from '@mui/material/Typography';


function Inbox() {
	return (
		<div className="h-screen w-full">
			<div className='flex w-full border-b'>
				Breadcrumb
			</div>
			<div className="flex w-full">
				<div className="flex border-b border-r">
					<div className="max-w-sm p-6 bg-white border border-gray-200 shadow">
						<a href="#">
							<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Teét</h5>
						</a>
						<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Teéest</p>
					</div>
				</div>
				<div className="flex border-b ">

					<Typography variant="h6" component="h2" gutterBottom>
						You have 3 new messages
					</Typography>
				</div>
			</div>
		</div>


	);
}

export default Inbox;
