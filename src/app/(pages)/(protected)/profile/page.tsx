"use client";

import React, { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import {
  User,
  Camera,
  Loader2,
  Trash2,
  AlertTriangle,
  Check,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { signOut } from "next-auth/react";

export default function ProfilePage() {
  const { data: session, update: updateSession } = useSession();
  const [isUploading, setIsUploading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states - initialize from session if available
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Sync state with session when it loads
  React.useEffect(() => {
    if (session?.user) {
      setName(session.user.name ?? "");
      setEmail(session.user.email ?? "");
    }
  }, [session]);

  // TRPC Mutations
  const uploadImageMutation = api.attachment.uploadImage.useMutation();
  const updateUserMutation = api.user.updateUser.useMutation({
    onSuccess: async () => {
      toast.success("Profile updated successfully");
      await updateSession();
      setIsUpdating(false);
    },
    onError: (err) => {
      toast.error("Failed to update profile: " + err.message);
      setIsUpdating(false);
    },
  });

  const deleteAccountMutation = api.user.deleteUser.useMutation({
    onSuccess: async () => {
      toast.success("Account deleted. Farewell.");
      await signOut({ callbackUrl: "/" });
    },
    onError: (err) => {
      toast.error("Failed to delete account: " + err.message);
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fileData = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          const base64 = result.split(",")[1];
          resolve(base64 ?? result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const uploadData = await uploadImageMutation.mutateAsync({
        fileData,
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
      });

      await updateUserMutation.mutateAsync({
        avatarUrl: uploadData.url,
      });

      toast.success("Avatar updated");
      // Force session update with the new image URL
      await updateSession({ image: uploadData.url });
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await updateUserMutation.mutateAsync({
        name,
        email,
      });
      await updateSession({ name, email });
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 mx-auto max-w-3xl px-6 pt-20 pb-24 duration-1000">
      {/* Header Section */}
      <header className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="space-y-1">
          <p className="text-[10px] font-bold tracking-[0.3em] text-[#34D399] uppercase">
            Workspace
          </p>
          <h1 className="text-foreground font-serif text-5xl font-medium tracking-tight italic">
            Profile
          </h1>
        </div>
      </header>

      <div className="space-y-16">
        {/* Profile Image Section */}
        <section className="border-border/10 border-b pb-12">
          <div className="flex flex-col items-center sm:flex-row sm:gap-10">
            <div className="group relative">
              <Avatar className="h-40 w-40 border-4 border-white/5 shadow-2xl transition-transform duration-500 group-hover:scale-105">
                <AvatarImage
                  src={session?.user?.image ?? ""}
                  key={session?.user?.image}
                />
                <AvatarFallback className="bg-zinc-900 font-serif text-4xl italic">
                  {session?.user?.name?.charAt(0) ?? "U"}
                </AvatarFallback>
              </Avatar>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="absolute right-2 bottom-2 rounded-full bg-[#86A694] !bg-none p-3 text-white shadow-lg transition-all hover:scale-110 active:scale-95 disabled:opacity-50"
              >
                {isUploading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Camera size={18} />
                )}
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>

            <div className="mt-6 flex-1 text-center sm:mt-0 sm:text-left">
              <h3 className="mb-2 text-sm font-bold tracking-[0.2em] text-zinc-500 uppercase">
                Profile Picture
              </h3>
              <p className="text-muted-foreground mb-4 text-sm">
                Click the camera icon to upload a new avatar. JPG, PNG or WEBP.
                Max 5MB.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="border-border/40 hover:bg-muted/50 mt-2 rounded-full bg-transparent text-xs font-medium tracking-wider uppercase"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                Change Photo
              </Button>
            </div>
          </div>
        </section>

        {/* Personal Info Section */}
        <section className="border-border/10 border-b pb-12">
          <h3 className="mb-8 flex items-center gap-2 text-sm font-bold tracking-[0.2em] text-zinc-500 uppercase">
            <User size={14} /> Personal Details
          </h3>
          <form onSubmit={handleUpdateProfile} className="max-w-md space-y-8">
            {/* Form Fields */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-muted-foreground/80 text-xs font-medium tracking-wider uppercase">
                  Display Name
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  autoComplete="off"
                  className="bg-muted/30 border-border/40 h-12 rounded-xl focus-visible:ring-[#86A694]/20"
                />
              </div>

              <div className="space-y-2">
                <label className="text-muted-foreground/80 text-xs font-medium tracking-wider uppercase">
                  Email Address
                </label>
                <Input
                  value={session?.user?.email ?? ""}
                  readOnly
                  placeholder="your@email.com"
                  className="bg-muted/10 border-border/20 h-12 cursor-not-allowed rounded-xl opacity-50 focus-visible:ring-0"
                />
                <p className="text-[10px] tracking-tight text-zinc-500">
                  Email cannot be changed.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                disabled={isUpdating || name === session?.user?.name}
                className="min-w-[140px] rounded-xl bg-[#86A694] !bg-none px-8 text-white transition-all hover:scale-105 hover:opacity-90 sm:w-auto"
              >
                {isUpdating ? (
                  <Loader2 size={16} className="mr-2 animate-spin" />
                ) : (
                  <Check size={16} className="mr-2" />
                )}
                Save Changes
              </Button>
            </div>
          </form>
        </section>

        {/* Account Controls Section */}
        <section className="pt-4">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-bold tracking-[0.2em] text-red-500/60 uppercase">
            <AlertTriangle size={14} /> Danger Zone
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md text-sm">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="rounded-xl border border-red-500/20 bg-red-500/10 !bg-none px-8 text-red-500 transition-all hover:scale-105 hover:bg-red-500 hover:text-white"
              >
                <Trash2 size={16} className="mr-2" />
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="border-border/40 bg-card rounded-2xl p-6 shadow-2xl sm:max-w-[400px]">
              <AlertDialogHeader>
                <AlertDialogTitle className="font-serif text-2xl font-medium tracking-tight italic">
                  Delete Account?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-muted-foreground pt-2 text-sm leading-relaxed">
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers, including
                  all your journals and entries.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="mt-6 flex flex-row gap-3 sm:justify-end">
                <AlertDialogCancel className="hover:bg-muted/50 mt-0 flex-1 rounded-xl border-none bg-transparent sm:flex-none">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="min-w-[100px] flex-1 rounded-xl bg-red-500 !bg-none text-white hover:bg-red-600 sm:flex-none"
                  onClick={() => deleteAccountMutation.mutate()}
                  disabled={deleteAccountMutation.isPending}
                >
                  {deleteAccountMutation.isPending ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    "Delete"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </section>
      </div>
    </div>
  );
}
