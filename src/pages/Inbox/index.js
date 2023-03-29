import Typography from '@mui/material/Typography';


function Inbox() {
	return (
		<div className="h-screen relative flex">
			<div className='flex w-full gap-x-4 h-[62px]'>
				Breadcrumb
			</div>
			<div className="flex w-full relative h-5">
				<div className="grid grid-cols-1 border-b border-r mb-7 pb-1 col-span-1">
					<div className="max-w-sm p-6 bg-white border border-gray-200 shadow">
						<a href="#">
							<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Teét</h5>
						</a>
						<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Teéest</p>
					</div>
				</div>
				<div className="grid grid-cols-1 border-b mb-7 pb-1 col-span-3">
					<Typography variant="h4" component="h1" gutterBottom>
						Inbox
					</Typography>
					<Typography variant="h6" component="h2" gutterBottom>
						You have 3 new messages
					</Typography>
				</div>
			</div>
		</div>


	);
}

export default Inbox;
