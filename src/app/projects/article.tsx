import { Project } from '@/interfaces/project';
import Link from "next/link";
import { Eye, View } from "lucide-react";

type Props = {
	project: Project;
};

export const Article: React.FC<Props> = ({ project }) => {
	return (
		<Link href={project.link}>
			<article className="p-4 md:p-8">
				<div className="flex justify-between gap-2 items-center">
					<span className="text-xs duration-1000 group-hover:opacity-80 drop-shadow-orange" style={{ color: 'var(--text-primary)' }}>
						{project.date ? (
							<time dateTime={new Date(project.date).toISOString()}>
								{Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
									new Date(project.date),
								)}
							</time>
						) : (
							<span>SOON</span>
						)}
					</span>
					<span className="text-xs flex items-center gap-1" style={{ color: 'var(--text-tertiary)' }}>
						<Eye className="w-4 h-4" />{" "}
						{Intl.NumberFormat("en-US", { notation: "compact" }).format(project.views)}
					</span>
				</div>
				<h2 className="z-20 text-xl font-medium duration-1000 lg:text-3xl group-hover:opacity-80 font-display" style={{ color: 'var(--text-primary)' }}>
					{project.title}
				</h2>
				<p className="z-20 mt-4 text-sm duration-1000 group-hover:opacity-90" style={{ color: 'var(--text-secondary)' }}>
					{project.description}
				</p>
			</article>
		</Link>
	);
};
