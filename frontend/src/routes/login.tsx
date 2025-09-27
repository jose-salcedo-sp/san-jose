import { useForm } from "@tanstack/react-form";
import { createFileRoute, getRouteApi, useNavigate } from '@tanstack/react-router';
import { type } from "arktype";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/contexts/auth";

export const Route = createFileRoute('/login')({
    component: RouteComponent,
    validateSearch: type({
        error: "string?"
    })
})

const loginSchema = type({
    user_name: "string > 0",
    password: "string > 0",
});

function RouteComponent() {
    const { error } = Route.useSearch();
    const navigate = useNavigate();
    const auth = useAuthStore();

    const form = useForm({
        defaultValues: { user_name: "", password: "" },
        validators: {
            onSubmit: loginSchema,
        },
        onSubmit: async ({ value }) => {
            const login = await auth.actions.login(value);

            if (login.success) {
                navigate({ to: '/app/facturas' });
                return;
            }

            navigate({ to: '/login', replace: true, search: { error: login.error } });
        }
    });

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
                        <form
                            className="flex flex-col gap-6"
                            onSubmit={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                form.handleSubmit();
                            }}
                        >
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="text-2xl font-bold">Iniciar Sesión</h1>
                                <p className="text-muted-foreground text-sm text-balance">
                                    Ingrese el nombre de usuario y contraseña
                                </p>
                                {/* {formError ? (
									<em role="alert" className="text-sm text-red-600">
										{formError}
									</em>
								) : null} */}
                            </div>

                            <div className="grid gap-6">
                                {/* user_name */}
                                <form.Field name="user_name">
                                    {(field) => (
                                        <div className="grid gap-3">
                                            <Label htmlFor={field.name}>Nombre de usuario</Label>
                                            <Input
                                                id={field.name}
                                                type="text"
                                                placeholder="usuario o correo"
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                aria-invalid={!field.state.meta.isValid}
                                                aria-describedby={`${field.name}-error`}
                                                required
                                            />
                                            {!field.state.meta.isValid ? (
                                                <em id={`${field.name}-error`} className="text-sm text-red-600">
                                                    {field.state.meta.errors.join(", ")}
                                                </em>
                                            ) : null}
                                        </div>
                                    )}
                                </form.Field>

                                <form.Field name="password">
                                    {(field) => (
                                        <div className="grid gap-3">
                                            <div className="flex items-center">
                                                <Label htmlFor={field.name}>Password</Label>
                                            </div>
                                            <Input
                                                id={field.name}
                                                type="password"
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                aria-invalid={!field.state.meta.isValid}
                                                aria-describedby={`${field.name}-error`}
                                                required
                                            />
                                            {!field.state.meta.isValid ? (
                                                <em id={`${field.name}-error`} className="text-sm text-red-600">
                                                    {field.state.meta.errors.join(", ")}
                                                </em>
                                            ) : null}
                                        </div>
                                    )}
                                </form.Field>

                                {error ? (
									<em role="alert" className="text-sm text-red-600">
										{error}
									</em>
								) : null}
                                <Button
                                    type="submit"
                                    className="w-full"
                                >
                                    Login
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="bg-muted relative hidden lg:block">
                <img
                    alt="San José Logo"
                    className="absolute inset-0 h-full w-full object-cover object-center dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    );
}
