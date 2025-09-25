import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/contexts/auth";

export default function LoginPage() {
    const authStore = useAuthStore();
    console.log(authStore);

	return (
		<div className="grid min-h-svh lg:grid-cols-2">
			<div className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex justify-center gap-2 md:justify-start">
					<div className="flex items-center gap-2 font-medium">
						<div className="bg-primary text-primary-foreground flex size-12 items-center justify-center">
							<img
								src="/san_jose.png"
								alt="San José Logo"
								className="h-full w-full object-cover object-center"
							/>
						</div>
						San José
					</div>
				</div>
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-xs">
						<form className="flex flex-col gap-6">
							<div className="flex flex-col items-center gap-2 text-center">
								<h1 className="text-2xl font-bold">Iniciar Sesión</h1>
								<p className="text-muted-foreground text-sm text-balance">
									Ingrese el nombre de usuario y contraseña
								</p>
							</div>
							<div className="grid gap-6">
								<div className="grid gap-3">
									<Label htmlFor="username">Nombre de usuario</Label>
									<Input
										id="username"
										type="username"
										placeholder="m@example.com"
										required
									/>
								</div>
								<div className="grid gap-3">
									<div className="flex items-center">
										<Label htmlFor="password">Password</Label>
									</div>
									<Input id="password" type="password" required />
								</div>
								<Button type="submit" className="w-full">
									Login
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
			<div className="bg-muted relative hidden lg:block">
				<img
					// src="/san_jose.png"
					alt="San José Logo"
					className="absolute inset-0 h-full w-full object-cover object-center dark:brightness-[0.2] dark:grayscale"
				/>
			</div>
		</div>
	);
}
